import { Component, OnInit } from '@angular/core';
import { Person } from '../data/person';
import { AppGlobalService } from '../services/app-global.service';

// Note: if we add a non-existing name in LIST_OF_PERSON_NAMES,
// the forJoin/Promise.all will fail and nothing is returned except an error log.
const LIST_OF_PERSON_NAMES = ['Kalle', 'Stina', 'Anna', 'Lars'];

@Component({
  selector: 'app-async-stuff',
  templateUrl: './async-stuff.component.html',
  styleUrls: ['./async-stuff.component.scss'],
})
export class AsyncStuffComponent implements OnInit {
  persons: Person[] = [];
  personsTransformed: Person[] = [];
  personsWithPromise: Person[] = [];
  constructor(private applicationGlobals: AppGlobalService) {}

  ngOnInit(): void {
    // Fetch multiple persons

    // Using observable with "subscribe"
    this.applicationGlobals
      .getPersons(LIST_OF_PERSON_NAMES)
      // tslint:disable-next-line: deprecation
      .subscribe(
        (res) => (this.persons = res),
        (error) => {
          console.log(error);
        }
      );

    // Using promise with "then"
    this.applicationGlobals
      .getPersonsWithPromiseAll(LIST_OF_PERSON_NAMES)
      .then((res) => (this.personsWithPromise = res))
      .catch((error) => {
        console.log(error);
      });

    this.applicationGlobals
      .getPersonsTransformThenForkJoin(LIST_OF_PERSON_NAMES)
      // tslint:disable-next-line: deprecation
      .subscribe((res) => (this.personsTransformed = res));
  }
}
