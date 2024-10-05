import { ICard } from "../interfaces/ICard";
import { IPokerVariant } from "../interfaces/IPokerVariant";
import { Value } from "../enums/Value";

/**
 * Class representing a standard poker variant.
 */
export class StandardPokerVariant implements IPokerVariant {
    handSize: number = 5;
    private valueOrder: Value[];

    constructor() {
        this.valueOrder = [
            Value.Two,
            Value.Three,
            Value.Four,
            Value.Five,
            Value.Six,
            Value.Seven,
            Value.Eight,
            Value.Nine,
            Value.Ten,
            Value.Jack,
            Value.Queen,
            Value.King,
            Value.Ace,
        ];
    }

    /**
     * Evaluates a poker hand and returns its rank.
     * @param hand An array of ICard objects.
     * @returns The rank of the poker hand as a string.
     */
    evaluateHand(hand: ICard[]): string {
        if (hand.length !== this.handSize) {
            throw new Error(`A ${this.handSize}-card hand is required.`);
        }

        // Check for duplicate cards
        const uniqueCards = new Set(hand.map(card => card.toString()));
        if (uniqueCards.size !== 5) {
            throw new Error("Duplicate cards detected in the hand.");
        }

        const values: Value[] = hand.map((card) => card.value);
        const suits = hand.map((card) => card.suit);

        if (this.isStraightFlush(values, suits)) return "Straight Flush";
        if (this.isFourOfAKind(values)) return "Four of a Kind";
        if (this.isFullHouse(values)) return "Full House";
        if (this.isFlush(suits)) return "Flush";
        if (this.isStraight(values)) return "Straight";
        if (this.isThreeOfAKind(values)) return "Three of a Kind";
        if (this.isTwoPair(values)) return "Two Pair";
        if (this.isOnePair(values)) return "One Pair";

        return `High Card (${this.highCard(values)})`;
    }

    private isFlush(suits: string[]): boolean {
        return suits.every((suit) => suit === suits[0]);
    }

    private isStraight(values: Value[]): boolean {
        const handValues = values
            .map((v) => this.valueOrder.indexOf(v))
            .sort((a, b) => a - b);

        const isConsecutive = handValues.every(
            (_value, i) => i === 0 || handValues[i] - handValues[i - 1] === 1
        );

        const isLowStraight =
            JSON.stringify(handValues) === JSON.stringify([0, 1, 2, 3, 12]); // A,2,3,4,5

        return isConsecutive || isLowStraight;
    }

    private isStraightFlush(values: Value[], suits: string[]): boolean {
        return this.isFlush(suits) && this.isStraight(values);
    }

    private isFourOfAKind(values: Value[]): boolean {
        const valueCount = this.getValueCounts(values);
        return Object.values(valueCount).some((count) => count === 4);
    }

    private isFullHouse(values: Value[]): boolean {
        const valueCount = this.getValueCounts(values);
        const counts = Object.values(valueCount);
        return counts.includes(3) && counts.includes(2);
    }

    private isThreeOfAKind(values: Value[]): boolean {
        const valueCount = this.getValueCounts(values);
        return Object.values(valueCount).some((count) => count === 3);
    }

    private isTwoPair(values: Value[]): boolean {
        const valueCount = this.getValueCounts(values);
        return Object.values(valueCount).filter((count) => count === 2).length === 2;
    }

    private isOnePair(values: Value[]): boolean {
        const valueCount = this.getValueCounts(values);
        return Object.values(valueCount).some((count) => count === 2);
    }

    private highCard(values: Value[]): Value {
        return values.reduce((high, value) => {
            return this.valueOrder.indexOf(value) > this.valueOrder.indexOf(high)
                ? value
                : high;
        }, values[0]);
    }

    private getValueCounts(values: Value[]): { [key in Value]?: number } {
        const valueCount: { [key in Value]?: number } = {};
        values.forEach((value) => {
            valueCount[value] = (valueCount[value] || 0) + 1;
        });
        return valueCount;
    }
}
