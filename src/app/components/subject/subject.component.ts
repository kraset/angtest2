import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/shared/global-data.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit {
  isUpdated?: boolean = undefined;
  updateInfoText?: string = undefined;
  constructor(public globalDataService: GlobalDataService) {}

  ngOnInit(): void {
    this.globalDataService.personUpdateEvent.subscribe((updated) => {
      this.updateInfoText = updated ? 'Uppdaterad!' : 'Personen uppdateras...';
    });
  }
}
