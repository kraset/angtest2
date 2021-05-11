export class Creature {
  private static idCounter = 1;

  public id: number;

  constructor(public name: string, public team: number) {
    this.id = Creature.idCounter++; // fake unique ID
  }
}
