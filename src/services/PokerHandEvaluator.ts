import {Card} from "../models/Card";
import {Value} from "../enums/Value";

/**
 * Class representing a poker hand evaluator.
 */
export class PokerHandEvaluator {
    private valueOrder: Value[];

    constructor(valueOrder: Value[]) {
        this.valueOrder = valueOrder;
    }

    /**
     * Evaluates a poker hand and returns its rank.
     * @param hand An array of 5 Card objects.
     * @returns The rank of the poker hand as a string.
     */
    evaluate(hand: Card[]): string {
        if (hand.length !== 5) {
            throw new Error("A poker hand must contain exactly 5 cards.");
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
