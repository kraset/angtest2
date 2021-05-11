import { Component, OnInit } from '@angular/core';
import {
  concat,
  forkJoin,
  merge,
  Observable,
  Observer,
  PartialObserver,
  race,
  Subscription,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { Creature } from 'src/app/data/model/creature';
import { Hero } from 'src/app/data/model/hero';
import { GameServerService } from 'src/app/data/services/game-server.service';

@Component({
  selector: 'app-more-rxjs',
  templateUrl: './game-client.component.html',
  styleUrls: ['./game-client.component.scss'],
})
export class GameClientComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private gameServerService: GameServerService) {}

  ngOnInit(): void {
    // this.fetchAllCreaturesVerbose();

    // This will never complete. Allows a continuous stream of new added creatures...
    const creatureStream: Observable<Creature> = this.gameServerService.getCreatureAsStream();
    creatureStream.subscribe({
      next: (creature) => {
        this.heroes.push(this.creatureToHero(creature));
      },
    });
  }

  creatureToHero(creature: Creature): Hero {
    return new Hero(
      creature.name,
      creature.team,
      5 + Math.floor(Math.random() * 20)
    );
  }

  // The observable will be created with from()
  runFrom(): void {
    this.gameServerService.getCreaturesFrom().subscribe((creature) => {
      this.heroes.push(this.creatureToHero(creature));
      console.log(creature.name);
    });
  }

  // The observable will be created with of()
  runOf(): void {
    this.gameServerService.getCreatures().subscribe((creatures) => {
      this.heroes = this.heroes.concat(
        creatures.map((creature) => this.creatureToHero(creature))
      );
      console.log(creatures);
    });
  }

  getTeam1(): void {
    this.gameServerService.getTeam1().subscribe((creature) => {
      this.heroes.push(this.creatureToHero(creature));
      console.log(creature.name);
    });
  }

  // Example with map: we can use RxJS "map" to do the mapping creature -> hero as part of the Observable stream
  getTeam2(): void {
    this.gameServerService
      .getTeam2()
      .pipe(map((creature) => this.creatureToHero(creature)))
      .subscribe((hero) => {
        this.heroes.push(hero);
        console.log(hero.name);
      });
  }

  runMerge(): void {
    const team1: Observable<Creature> = this.gameServerService.getTeam1();
    const team2: Observable<Creature> = this.gameServerService.getTeam2();
    merge(team1, team2).subscribe((creature) => {
      this.heroes.push(this.creatureToHero(creature));
      console.log(creature.name);
    });
  }

  runConcat(): void {
    const team1: Observable<Creature> = this.gameServerService.getTeam1();
    const team2: Observable<Creature> = this.gameServerService.getTeam2();
    concat(team1, team2).subscribe((creature) => {
      this.heroes.push(this.creatureToHero(creature));
      console.log(creature.name);
    });
  }

  runForkJoin(): void {
    const teams: Observable<Creature>[] = [
      this.gameServerService.getTeam1(),
      this.gameServerService.getTeam2(),
    ];
    forkJoin(teams).subscribe((creatures) => {
      this.heroes = this.heroes.concat(
        creatures.map((creature) => this.creatureToHero(creature))
      );
      console.log(creatures);
    });
  }

  runRace(): void {
    const team1: Observable<Creature> = this.gameServerService.getTeam1();
    const team2: Observable<Creature> = this.gameServerService.getTeam2();
    race(team1, team2).subscribe((creature) => {
      this.heroes.push(this.creatureToHero(creature));
      console.log(creature.name);
    });
  }

  /*
   * 1. Fetch some selected heroes.
   * 2. Fetch them at the same time, i.e. sending simultaneous async requests.
   * 3. We want ONE final complete event, when we have all.  -> forkJoin.
   * 5. We also want our objects to be transformed to Hero as part of the chain.
   */
  getSelectedCreatures(): void {
    const selectedNames = ['Vampire', 'Dwarf', 'Skeleton', 'Wizard'];
    forkJoin(
      selectedNames.map((name) =>
        this.gameServerService
          .getCreatureByName(name)
          .pipe(map((creature) => this.creatureToHero(creature)))
      )
    ).subscribe((heroes) => {
      this.heroes = heroes;
      console.log(heroes);
    });
  }

  clear(): void {
    this.heroes = [];
  }

  // This subscription will complete! Reads all available creatures at this time.
  // New creatures added at server side later will not appear in client!
  fetchAllCreaturesVerbose(): void {
    // Define an observer - supply 3 methods: next, error and complete
    const creatureObserver: Observer<Creature[]> = {
      next: (creatures) => {
        this.heroes = creatures.map((creature) =>
          this.creatureToHero(creature)
        );
      },
      error: () => {
        console.log('Something went wrong!');
      },
      complete: () => {
        console.log('Complete, no more creatures to read!');
      },
    };

    // Declare and assign the observable
    const allCreaturesObservable: Observable<
      Creature[]
    > = this.gameServerService.getCreatures();

    // Start the subscription, and NOW the Observable starts emitting data!
    const mySubscription: Subscription = allCreaturesObservable.subscribe(
      creatureObserver
    );
  }
}
