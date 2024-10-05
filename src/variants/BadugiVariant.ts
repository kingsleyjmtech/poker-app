import {IPokerVariant} from "../interfaces/IPokerVariant";
import {ICard} from "../interfaces/ICard";

/**
 * Class representing a Badugi variant.
 */
export class BadugiVariant implements IPokerVariant {
    handSize: number = 4;

    evaluateHand(hand: ICard[]): string {
        if (hand.length !== this.handSize) {
            throw new Error(`A ${this.handSize}-card hand is required.`);
        }

        // Implement Badugi-specific hand evaluation logic
        // This is a placeholder; actual Badugi logic needs to be implemented
        // For demonstration purposes, we'll return "Badugi Hand"

        // TODO: Implement Badugi hand evaluation
        return "Badugi Hand";
    }
}