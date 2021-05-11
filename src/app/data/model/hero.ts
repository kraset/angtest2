import { Creature } from './creature';

export class Hero extends Creature {
  constructor(
    public name: string,
    public team: number,
    public hitpoints: number
  ) {
    super(name, team);
  }
}
