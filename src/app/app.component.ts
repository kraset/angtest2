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
    this.testDates();
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

  testDates(): void {
    // A list of DateTime objects in unsorted order...
    const bookedDates: Date[] = [
      new Date('2020-12-02'),
      new Date('2020-12-03'),
      new Date('2020-12-11'),
      new Date('2020-12-21'),
      new Date('2020-12-19'),
      new Date('2020-12-07'),
      new Date('2020-12-09'),
      new Date('2020-12-10'),
      new Date('2020-12-20'),
      new Date('2020-12-28'),
    ];
    console.log(bookedDates);

    // Transform this list of unsorted DateTime objects to sorted list of date-numbers: [2,3,7,9,10,11,19,20,21,28]
    const bookedDateNumbers: number[] = bookedDates
      .map((date) => date.getDate())   // first do the transformation from DateTime object to date number...
      .sort((date1, date2) => date1 - date2);  // sort this list afterwards...

    // From this list, we want to create some date groups of consecutive dates...
    const dateGroups: number[][] = [];   // -> [   [2,3], [3], [7], [9,10,11], [19,20,21], [28]   ]
    let dateGroup: number[] = [];  // this is a consecutive dates group, e.g.  [2,3]

    for (let i = 0; i < bookedDateNumbers.length; i++) {
      dateGroup.push(bookedDateNumbers[i]);
      // If we find a non-consecutive number...
      if (
        i === bookedDateNumbers.length - 1 ||
        bookedDateNumbers[i + 1] !== bookedDateNumbers[i] + 1
      ) {
        dateGroups.push(dateGroup); // ... push it to our dateGroups
        dateGroup = []; // ... and reset this group...
      }
    }
    console.log(dateGroups);
  }
}
