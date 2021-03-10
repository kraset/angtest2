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
  constructor(private applicationGlobals: AppGlobalService) {}

  ngOnInit(): void {
    // Fetch multiple persons
    const useObservable = false;

    if (useObservable) {
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
    }

    if (!useObservable) {
      // Using promise with "then"
      this.applicationGlobals
        .getPersonsV2(LIST_OF_PERSON_NAMES)
        .then((res) => (this.persons = res))
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
