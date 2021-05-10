import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/data/model/person';
import { GlobalDataStoreService } from 'src/app/shared/global-data.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss'],
})
export class EditPersonComponent implements OnInit {
  name = '';

  constructor(public globalDataService: GlobalDataStoreService) {}

  ngOnInit(): void {}

  onClickUpdatedName(): void {
    // Update global shared data...
    this.globalDataService.person.name = this.name;
    // Let anyone know (who is interested) that person is now updated!
    this.globalDataService.personUpdateEvent.next(true);
 }

  onKey(event: any): void{
    // Let anyone know (who is interested) that person is currently being updated...
    this.globalDataService.personUpdateEvent.next(false);
  }
}
