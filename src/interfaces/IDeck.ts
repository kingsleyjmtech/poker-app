import {ICard} from "./ICard";
import {IShuffler} from "./IShuffler";

/**
 * Interface representing a deck of cards.
 */
export interface IDeck {
    cards: ICard[];

    initializeDeck(): void;

    shuffle(): void;

    deal(numCards: number): ICard[];

    reset(): void;

    setShuffler(shuffler: IShuffler): void;
}