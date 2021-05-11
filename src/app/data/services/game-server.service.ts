import { Injectable } from '@angular/core';
import { from, interval, Observable, of, Subject, timer } from 'rxjs';
import { Creature } from '../model/creature';
import { GameState } from '../model/game-state';

/*
 * Faked backend API - database table
 */
const CREATURES_TEAM1 = [
  new Creature('Warrior', 1),
  new Creature('Wizard', 1),
  new Creature('Knight', 1),
  new Creature('Vampire', 1),
];

const CREATURES_TEAM2 = [
  new Creature('Bowman', 2),
  new Creature('Priest', 2),
  new Creature('Dwarf', 2),
  new Creature('Skeleton', 2),
];

/*
 * A global data service that holds the data. Other components can subscribe to subject that data has been updated.
 */
@Injectable({
  providedIn: 'root',
})
export class GameServerService {
  allCreatures = CREATURES_TEAM1.concat(CREATURES_TEAM2);
  creatures = CREATURES_TEAM1;
  gameState = new GameState();
  addedCreatures = 0;

  public creatureAddedEvent = new Subject<Creature>();
  public worldTimeTickEvent = new Subject<GameState>();

  constructor() {
    // Emit game world ticks
    interval(1000).subscribe((n) => {
      this.gameState.worldTime = n;
      this.worldTimeTickEvent.next(this.gameState);
    });
  }

  // Someone added a creature, notify subscriber(s) to the creatureAddedEvent-subject
  addCreature(): void {
    if (this.addedCreatures < this.allCreatures.length) {
      const newCreature = this.allCreatures[this.addedCreatures++];
      this.creatures.push(newCreature);
      this.creatureAddedEvent.next(newCreature);
    }
  }

  // Using 'of': Will produce 1 emitted value of a whole array.
  getCreatures(): Observable<Creature[]> {
    return of(CREATURES_TEAM1);
  }

  // Using 'from': Will produce a sequence of emitted values, but ends with "complete" on the stream!
  getCreaturesFrom(): Observable<Creature> {
    return from(CREATURES_TEAM2);
  }

  // Produce a stream of Team 1 heroes with some delay, end with complete
  getTeam1(): Observable<Creature> {
    return new Observable<Creature>((subscriber) => {
      timer(200, 500).subscribe((n) => {
        if (n < CREATURES_TEAM1.length) {
          subscriber.next(CREATURES_TEAM1[n]);
        } else {
          subscriber.complete();
        }
      });
    });
  }

  // Produce a stream of Team 2 heroes with some delay, end with complete
  getTeam2(): Observable<Creature> {
    return new Observable<Creature>((subscriber) => {
      timer(100, 700).subscribe((n) => {
        if (n < CREATURES_TEAM1.length) {
          subscriber.next(CREATURES_TEAM2[n]);
        } else {
          subscriber.complete();
        }
      });
    });
  }

  /*
   * Will produce a sequence of creatures, will never complete...
   * Whenever a creature is added in the server, notify subscriber!
   */
  getCreatureAsStream(): Observable<Creature> {
    return new Observable<Creature>((subscriber) => {
      this.creatureAddedEvent.subscribe((newCreature) => {
        subscriber.next(newCreature);
      });
    });
  }

  getCreatureByName(name: string): Observable<Creature> {
    return new Observable<Creature>((subscriber) => {
      const creature = this.allCreatures.find((c) => c.name === name);
      if (creature) {
        subscriber.next(creature);
        subscriber.complete();
      } else {
        subscriber.error();
      }
    });
  }

  togglePoison(): void {
    this.gameState.poison = !this.gameState.poison;
  }
}
