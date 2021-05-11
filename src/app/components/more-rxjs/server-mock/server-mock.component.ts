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


  ngOnInit(): void {}

  onClickAddCreature(): void {
    this.gameServerService.addCreature();
  }

  onClickTogglePoison(): void {
    this.gameServerService.togglePoison();
  }

}
