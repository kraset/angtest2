import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Person } from '../data/person';

/*
 * A global data service that holds the data. Other components can subscribe to subject that data has been updated.
 */
@Injectable({
  providedIn: 'root',
})
export class GlobalDataStoreService {
  // Shared global data
  person: Person = new Person('Ragnar', 12);

  // Set to false if currently updating, true if done updating
  public personUpdateEvent = new Subject<boolean>();

  constructor() {}
}
