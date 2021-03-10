import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Person } from '../data/person';
import { BackendApiService } from './backend-api.service';

/*
 * A helper-service that can do N x API calls and merge them into one Observable or Promise
 */
@Injectable({
  providedIn: 'root',
})
export class AppGlobalService {
  constructor(private backendApi: BackendApiService) {}

  // Call the API N times for each person name and forkJoin the result into one Observable
  getPersons(names: string[]): Observable<Person[]> {
    const observables = names.map((name) => {
      return this.backendApi.getPersonInfo(name);
    });
    return forkJoin(observables);
  }

  getPersonsV2(names: string[]): Promise<Person[]> {
    // Create API call for every name and convert them to promises...
    const promises = names.map((name) => {
      return this.backendApi.getPersonInfo(name).toPromise();
    });
    // Force all promises to resolve as one promise...

    // We can return the promise immediately...
    // return Promise.all(promises);

    // ... or we can chain some extra "then" for processing/mapping data...
    return Promise.all(promises).then((persons) => {
      // Process the data: filter out all persons with age>=20!
      return persons.filter((p) => p.age >= 20);
    });
  }
}
