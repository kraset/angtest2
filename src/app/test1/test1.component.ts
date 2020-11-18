import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../data/person';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {

  @Input() valueX: number;
  @Input() person: Person;

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked(): void {
    this.valueX++;
    this.person.age++;
  }

}
