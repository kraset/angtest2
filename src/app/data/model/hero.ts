import { Creature } from './creature';

export class Hero extends Creature {
  constructor(
    public name: string,
    public gold: number,
    public hitpoints: number
  ) {
    super(name, gold);
  }
}
