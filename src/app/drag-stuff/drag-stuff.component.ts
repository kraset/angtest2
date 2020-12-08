import { Component, OnInit } from '@angular/core';
import { Person } from '../data/person';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-stuff',
  templateUrl: './drag-stuff.component.html',
  styleUrls: ['./drag-stuff.component.scss'],
})
export class DragStuffComponent implements OnInit {
  persons: Person[] = [
    new Person('Kalle', 12),
    new Person('Nisse', 22),
    new Person('Stina', 32),
    new Person('Anna', 36),
  ];

  items: string[] = [
    'Kalle',
    'Nisse',
    'Stina',
    'Anna',
  ];
  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Person[]>): void {
    moveItemInArray(this.persons, event.previousIndex, event.currentIndex);
  }

}
