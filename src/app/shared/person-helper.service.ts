import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Person } from '../data/person';
import { PersonApiService } from '../data/services/person-api.service';
import { map } from 'rxjs/operators';

/*
 * A helper-service that can do N x API calls and merge them into one Observable or Promise
 */
@Injectable({
  providedIn: 'root',
})
export class PersonHelperService {
  constructor(private personApiService: PersonApiService) {}

  // Call the API N times for each person name and forkJoin the result into one Observable
  getPersons(names: string[]): Observable<Person[]> {
    const observables = names.map((name) => {
      return this.personApiService.getPersonInfo(name);
    });
    return forkJoin(observables);
  }

  getPersonsWithPromiseAll(names: string[]): Promise<Person[]> {
    // Create API call for every name and convert them to promises...
    const promises = names.map((name) => {
      return this.personApiService.getPersonInfo(name).toPromise();
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

  /*
   * 1. Create one observable call for every name in the list of names.
   * 2. Use pipe to apply a transform on the result from the reponse, adding +5 to age and converting name to upper case.
   *    Note! Very important! During this transform, we still have access to the "name" variable
   *    from the original map-call, so we can use it in the transform!
   * 3. ForkJoin all the observables into one Observable.
   *    Note: the API calls are not yet called.
   *    For this to happen, we have to call subscribe on the forkJoin observable!
   */
  getPersonsTransformThenForkJoin(names: string[]): Observable<Person[]> {
    const observables = names.map((name) => {
      return this.personApiService
        .getPersonInfo(name)
        .pipe(
          map(
            (personObject: Person) =>
              new Person(name.toUpperCase(), personObject.age + 5)
          )
        );
    });
    return forkJoin(observables);
  }
}
