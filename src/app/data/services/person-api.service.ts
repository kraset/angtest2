import { Injectable } from '@angular/core';
import { from, Observable, of, Subject, throwError, timer } from 'rxjs';
import { Person } from '../model/person';

/*
 * Faked backend API
 */
const PERSONS = [
  new Person('Kalle', 5),
  new Person('Stina', 39),
  new Person('Lars', 25),
  new Person('Anna', 28),
  new Person('John', 23),
  new Person('Helen', 35),
  new Person('Cecilia', 41),
];

@Injectable({
  providedIn: 'root',
})
export class PersonApiService {
  persons = PERSONS;
  personAddedEvent = new Subject<Person>();

  constructor() {}

  getPersonInfo(name: string): Observable<Person> {
    const person = this.persons.find((p) => p.name === name);
    if (person !== undefined) {
      return of(person);
    } else {
      return throwError(name + ' does not exist...'); // forkJoin and Promise.all will fail if this happens for one of the calls
    }
  }

  getAll(): Observable<Person[]> {
    return of(this.persons); // just 1 event is sent with the whole array
  }

  getPersonFromId(id: number): Observable<Person> {
    const person = this.persons.find((p) => p.id === id);
    if (person !== undefined) {
      return of(person);
    } else {
      return throwError(id + ' does not exist...');
    }
  }

}
