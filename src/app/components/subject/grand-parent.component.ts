import { Component, OnInit } from '@angular/core';
import { GlobalDataStoreService } from 'src/app/shared/global-data.service';

@Component({
  selector: 'app-grand-parent',
  templateUrl: './grand-parent.component.html',
  styleUrls: ['./grand-parent.component.scss'],
})
export class GrandParentComponent implements OnInit {
  isUpdated?: boolean = undefined;
  updateInfoText?: string = undefined;
  constructor(public globalDataService: GlobalDataStoreService) {}

  ngOnInit(): void {
    this.globalDataService.personUpdateEvent.subscribe((updated) => {
      this.updateInfoText = updated ? 'Uppdaterad!' : 'Personen uppdateras...';
    });
  }
}
