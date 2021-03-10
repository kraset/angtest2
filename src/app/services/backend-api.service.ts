import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Person } from '../data/person';

const persons = [
  new Person('Kalle', 5),
  new Person('Stina', 39),
  new Person('Lars', 25),
  new Person('Anna', 28),
];

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  constructor() {}

  getPersonInfo(name: string): Observable<Person> {
    const person = persons.find((p) => p.name === name);
    if (person !== undefined) {
      return of(person);
    } else {
      return throwError(name + ' does not exist...'); // forkJoin and Promise.all will fail if this happens for one of the calls
    }
  }
}
