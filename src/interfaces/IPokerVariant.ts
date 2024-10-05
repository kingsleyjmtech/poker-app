import {ICard} from "./ICard";

/**
 * Interface representing a poker variant.
 */
export interface IPokerVariant {
    handSize: number;

    evaluateHand(hand: ICard[]): string;
}
