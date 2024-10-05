import {ICard} from "../interfaces/ICard";
import {Suit} from "../enums/Suit";
import {Value} from "../enums/Value";

/**
 * Class representing a card.
 */
export class Card implements ICard {
  constructor(public suit: Suit, public value: Value) {}

  toString(): string {
    return `${this.value}${this.suit}`;
  }
}
