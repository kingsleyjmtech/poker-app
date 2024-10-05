import {Value} from "../enums/Value";
import {Suit} from "../enums/Suit";

/**
 * Interface representing a card.
 */
export interface ICard {
    suit: Suit;
    value: Value;

    toString(): string;
}