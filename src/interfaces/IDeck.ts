import {ICard} from "./ICard";

/**
 * Interface representing a deck of cards.
 */
export interface IDeck {
    cards: ICard[];

    initializeDeck(): void;

    shuffle(): void;

    deal(numCards: number): ICard[];

    reset(): void;
}