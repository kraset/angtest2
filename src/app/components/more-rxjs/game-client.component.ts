import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    // This subscription will complete! Reads all available creatures at this time.
    // New creatures added at server side later will not appear in client!
    const allCreatures: Observable<Creature[]> = this.gameServerService.getCreatures();
    allCreatures.subscribe({
      next: (creatures) => {
        this.heroes = creatures.map((creature) =>
          this.creatureToHero(creature)
        );
      },
      complete: () => {
        console.log('complete');
      },
    });

    // This will never complete. Allows a continuous stream of new added creatures...
    const creatureStream: Observable<Creature> = this.gameServerService.getCreatureAsStream();
    creatureStream.subscribe({
      next: (person) => {
        this.heroes.push(this.creatureToHero(person));
      },
    });
  }

  creatureToHero(creature: Creature): Hero {
    return new Hero(
      creature.name,
      creature.gold,
      5 + Math.floor(Math.random() * 20)
    );
  }
}
