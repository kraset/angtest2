import { ThrowStmt } from '@angular/compiler';
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
  imagePath = '';
  isPoisoned = false;

  constructor(private gameServerService: GameServerService) {}

  ngOnInit(): void {
    this.imagePath = `assets/images/${this.hero.name.toLowerCase()}.png`;
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
      this.isPoisoned = true;
      this.hero.hitpoints--;
      if (this.hero.hitpoints === 0) {
        // Cancel the subscription when person is dead!
        this.worldTimeTick.unsubscribe();
      }
    } else {
      this.isPoisoned = false;
    }
  }

  getStylingColors(): string {
    const borderClass = this.hero.team === 1 ? 'team1-border' : 'team2-border';
    if (!this.isAlive()) {
      return 'bg-dead ' + borderClass;
    } else if (this.isPoisoned) {
      return 'bg-poisoned';
    } else {
      return 'bg-normal ' + borderClass;
    }
  }

  isAlive(): boolean {
    return this.hero.hitpoints > 0;
  }
}
