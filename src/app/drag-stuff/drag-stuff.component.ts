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

  images: string[] = [
    'assets/images/1.jpg',
    'assets/images/2.jpg',
    'assets/images/3.jpg',
    'assets/images/4.jpg',
  ];

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.persons, event.previousIndex, event.currentIndex);
  }

  dropImage(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
  }


}
