import { Component, OnInit } from '@angular/core';
import { Person } from './data/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Christians Play And Have Fun Angular Test 2';

  person = new Person('Anna', 20); // See how this changes in parent/child
  valueX = 0; // See how this changes in parent/child
  newPerson: Person = new Person('a', 2); // Use this for pipe example

  // Currently not used...
  persons = [
    new Person('Stina', 5),
    new Person('Henke', 10),
    new Person('Valle', 17),
  ];

  ngOnInit(): void {
    this.executePipeExample();
  }

  // Definition of our general pipe where the function takes 1 argument
  pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

  add4(n: number): number {
    return n + 4;
  }

  createNewPersonWithAge(age: number): Person {
    return new Person('Kalle', age);
  }

  executePipeExample(): void {
    // The call to pipe uses the argument (2) as input to the first function add4.
    // The result of add4() is piped into the next function as in-argument.
    // The final return value is the last function's return value which happens to be a Person-objekt
    this.newPerson = this.pipe(this.add4, this.createNewPersonWithAge)(2);
  }
}
