import {ICard} from "./ICard";

/**
 * Interface representing a shuffler.
 */
export interface IShuffler {
    shuffle(cards: ICard[]): ICard[];
}