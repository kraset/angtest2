import { Component, OnInit } from '@angular/core';
import { Creature } from 'src/app/data/model/creature';
import { Person } from 'src/app/data/model/person';
import { GameServerService } from 'src/app/data/services/game-server.service';

@Component({
  selector: 'app-server-mock',
  templateUrl: './server-mock.component.html',
  styleUrls: ['./server-mock.component.scss'],
})
export class GameServerMockComponent implements OnInit {
  constructor(private gameServerService: GameServerService) {}

  creatures = [
    new Creature('Knight', 85),
    new Creature('Bowman', 25),
    new Creature('Soldier', 32),
    new Creature('Priest', 90),
  ];
  index = 0;

  ngOnInit(): void {}

  onClickAddCreature(): void {
    if (this.index < this.creatures.length) {
      this.gameServerService.addCreature(this.creatures[this.index++]);
    }
  }

  onClickTogglePoison(): void {
    this.gameServerService.togglePoison();
  }

}
