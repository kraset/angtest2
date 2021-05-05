import { Component, OnInit } from '@angular/core';
import { Person } from './data/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Christians Play And Have Fun Angular Test 2';

  ngOnInit(): void {
  }

}
