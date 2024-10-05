import { BadugiVariant } from "../src/variants/BadugiVariant";
import { ICard } from "../src/interfaces/ICard";
import { Suit } from "../src/enums/Suit";
import { Value } from "../src/enums/Value";

describe("BadugiVariant", () => {
    let badugiVariant: BadugiVariant;

    beforeEach(() => {
        badugiVariant = new BadugiVariant();
    });

    test("should evaluate a valid 4-card hand", () => {
        const hand: ICard[] = [
            { suit: Suit.Spades, value: Value.Two },
            { suit: Suit.Hearts, value: Value.Three },
            { suit: Suit.Diamonds, value: Value.Four },
            { suit: Suit.Clubs, value: Value.Five },
        ];
        const result = badugiVariant.evaluateHand(hand);
        expect(result).toBe("Badugi Hand");
    });

    test("should throw an error for a hand with more than 4 cards", () => {
        const hand: ICard[] = [
            { suit: Suit.Spades, value: Value.Two },
            { suit: Suit.Hearts, value: Value.Three },
            { suit: Suit.Diamonds, value: Value.Four },
            { suit: Suit.Clubs, value: Value.Five },
            { suit: Suit.Spades, value: Value.Six }, // Extra card
        ];
        expect(() => badugiVariant.evaluateHand(hand)).toThrow("A 4-card hand is required.");
    });

    test("should throw an error for a hand with less than 4 cards", () => {
        const hand: ICard[] = [
            { suit: Suit.Spades, value: Value.Two },
            { suit: Suit.Hearts, value: Value.Three },
        ];
        expect(() => badugiVariant.evaluateHand(hand)).toThrow("A 4-card hand is required.");
    });

    test("should evaluate a 4-card hand even if all suits and values are the same", () => {
        const hand: ICard[] = [
            { suit: Suit.Spades, value: Value.Two },
            { suit: Suit.Spades, value: Value.Two },
            { suit: Suit.Spades, value: Value.Two },
            { suit: Suit.Spades, value: Value.Two },
        ];
        const result = badugiVariant.evaluateHand(hand);
        expect(result).toBe("Badugi Hand");
    });

    test("should handle a 4-card hand with mixed suits and values", () => {
        const hand: ICard[] = [
            { suit: Suit.Spades, value: Value.Ace },
            { suit: Suit.Hearts, value: Value.Two },
            { suit: Suit.Diamonds, value: Value.Three },
            { suit: Suit.Clubs, value: Value.Four },
        ];
        const result = badugiVariant.evaluateHand(hand);
        expect(result).toBe("Badugi Hand");
    });
});
