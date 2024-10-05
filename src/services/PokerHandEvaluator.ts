import {Card} from "../models/Card";

export class PokerHandEvaluator {
    private static valueOrder: string[] = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",
    ];

    static evaluate(hand: Card[]): string {
        const values = hand.map((card) => card.value);
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

    private static isFlush(suits: string[]): boolean {
        return suits.every((suit) => suit === suits[0]);
    }

    private static isStraight(values: string[]): boolean {
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

    private static isStraightFlush(values: string[], suits: string[]): boolean {
        return this.isFlush(suits) && this.isStraight(values);
    }

    private static isFourOfAKind(values: string[]): boolean {
        const valueCount = this.getValueCounts(values);
        return Object.values(valueCount).some((count) => count === 4);
    }

    private static isFullHouse(values: string[]): boolean {
        const valueCount = this.getValueCounts(values);
        const counts = Object.values(valueCount);
        return counts.includes(3) && counts.includes(2);
    }

    private static isThreeOfAKind(values: string[]): boolean {
        const valueCount = this.getValueCounts(values);
        return Object.values(valueCount).some((count) => count === 3);
    }

    private static isTwoPair(values: string[]): boolean {
        const valueCount = this.getValueCounts(values);
        return Object.values(valueCount).filter((count) => count === 2).length === 2;
    }

    private static isOnePair(values: string[]): boolean {
        const valueCount = this.getValueCounts(values);
        return Object.values(valueCount).some((count) => count === 2);
    }

    private static highCard(values: string[]): string {
        return values.reduce((high, value) => {
            return this.valueOrder.indexOf(value) > this.valueOrder.indexOf(high)
                ? value
                : high;
        }, values[0]);
    }

    private static getValueCounts(values: string[]): { [key: string]: number } {
        const valueCount: { [key: string]: number } = {};
        values.forEach((value) => {
            valueCount[value] = (valueCount[value] || 0) + 1;
        });
        return valueCount;
    }
}
