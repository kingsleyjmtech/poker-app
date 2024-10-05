import {Card} from '../src/models/Card';
import {Suit} from '../src/enums/Suit';
import {Value} from '../src/enums/Value';

describe('Card', () => {
    test('should correctly initialize a card with suit and value', () => {
        const card = new Card(Suit.Spades, Value.Ace);
        expect(card.suit).toBe(Suit.Spades);
        expect(card.value).toBe(Value.Ace);
    });

    test('should return correct string representation with toString()', () => {
        const card = new Card(Suit.Hearts, Value.Ten);
        expect(card.toString()).toBe('10♥');
    });

    test('should return correct string representation for face cards', () => {
        const queenOfDiamonds = new Card(Suit.Diamonds, Value.Queen);
        const jackOfClubs = new Card(Suit.Clubs, Value.Jack);
        const kingOfSpades = new Card(Suit.Spades, Value.King);

        expect(queenOfDiamonds.toString()).toBe('Q♦');
        expect(jackOfClubs.toString()).toBe('J♣');
        expect(kingOfSpades.toString()).toBe('K♠');
    });

    test('should return correct string representation for number cards', () => {
        const twoOfHearts = new Card(Suit.Hearts, Value.Two);
        const nineOfClubs = new Card(Suit.Clubs, Value.Nine);

        expect(twoOfHearts.toString()).toBe('2♥');
        expect(nineOfClubs.toString()).toBe('9♣');
    });

    test('should handle lower boundary values', () => {
        const card = new Card(Suit.Diamonds, Value.Two);
        expect(card.toString()).toBe('2♦');
    });

    test('should handle upper boundary values', () => {
        const card = new Card(Suit.Spades, Value.Ace);
        expect(card.toString()).toBe('A♠');
    });
});
