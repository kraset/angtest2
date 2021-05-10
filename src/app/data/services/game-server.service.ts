import { Injectable } from '@angular/core';
import { from, Observable, of, Subject, timer } from 'rxjs';
import { Creature } from '../model/creature';
import { GameState } from '../model/game-state';

/*
 * Faked backend API - database table
 */
const CREATURES = [
  new Creature('Warrior', 5),
  new Creature('Wizard', 39),
  new Creature('Hunter', 25),
  new Creature('Dwarf', 28),
];

/*
 * A global data service that holds the data. Other components can subscribe to subject that data has been updated.
 */
@Injectable({
  providedIn: 'root',
})
export class GameServerService {
  creatures = CREATURES;
  gameState = new GameState();

  public creatureAddedEvent = new Subject<Creature>();
  public worldTimeTickEvent = new Subject<GameState>();

  constructor() {

    // Emit game world ticks
    timer(1000, 1000).subscribe( () => {
      this.gameState.worldTime++;
      this.worldTimeTickEvent.next(this.gameState);
    });
  }

  // Using 'of': Will produce 1 emitted value of a whole array.
  getCreatures(): Observable<Creature[]> {
    return of(CREATURES);
  }

  /* Using 'from': Will produce a sequence of emitted values, but ends with "complete" on the stream!
  getCreatures(): Observable<Creature> {
    return from(CREATURES);
  }*/

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

  // Someone added a creature, notify subscriber(s) to the creatureAddedEvent-subject
  addCreature(creature: Creature): void {
    this.creatures.push(creature);
    this.creatureAddedEvent.next(creature);
  }

  togglePoison(): void {
    this.gameState.poison = !this.gameState.poison;
  }

}
