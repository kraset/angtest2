import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Person } from '../../data/model/person';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss'],
})
export class Test1Component implements OnInit {
  @Input() valueX: number;
  @Input() person: Person;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      // Without the timeout, it will say that value was changed before it was checked...
      this.person.birthdate = new Date('1974-04-15');
    });
  }

  buttonClicked(): void {
    this.valueX++;
    this.person.age++;
  }
}
