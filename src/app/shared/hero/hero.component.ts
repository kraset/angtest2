import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameState } from 'src/app/data/model/game-state';
import { Hero } from 'src/app/data/model/hero';
import { GameServerService } from 'src/app/data/services/game-server.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  @Input() hero: Hero;
  worldTimeTick: Subscription;

  constructor(private gameServerService: GameServerService) {}

  ngOnInit(): void {
    this.worldTimeTick = this.gameServerService.worldTimeTickEvent.subscribe({
      next: (gameState) => {
        this.handleWorldTimeTick(gameState);
      },
      complete: () => {
        console.log('Game over');
      },
      error: () => {
        console.log('Error');
      },
    });
  }

  handleWorldTimeTick(gameState: GameState): void {
    if (gameState.poison) {
      this.hero.hitpoints--;
      if (this.hero.hitpoints === 0) {
        // Cancel the subscription when person is dead!
        this.worldTimeTick.unsubscribe();
      }
    }
  }

  isAlive(): boolean {
    return this.hero.hitpoints > 0;
  }
}
