export class Person {
  private static idCounter = 1;

  public id: number;
  public birthdate: Date;

  constructor(public name: string, public age: number) {
    this.id = Person.idCounter++; // fake unique ID
  }
}
