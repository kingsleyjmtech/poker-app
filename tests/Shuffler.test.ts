import { FisherYatesShuffler } from '../src/shufflers/FisherYatesShuffler';
import { OverhandShuffler } from '../src/shufflers/OverhandShuffler';
import { Card } from '../src/models/Card';
import { Suit } from '../src/enums/Suit';
import { Value } from '../src/enums/Value';

describe('Shufflers', () => {
    const originalDeck: Card[] = [
        new Card(Suit.Spades, Value.Two),
        new Card(Suit.Spades, Value.Three),
        new Card(Suit.Spades, Value.Four),
        new Card(Suit.Spades, Value.Five),
        new Card(Suit.Spades, Value.Six),
        new Card(Suit.Spades, Value.Seven),
        new Card(Suit.Spades, Value.Eight),
        new Card(Suit.Spades, Value.Nine),
        new Card(Suit.Spades, Value.Ten),
        new Card(Suit.Spades, Value.Jack),
        new Card(Suit.Spades, Value.Queen),
        new Card(Suit.Spades, Value.King),
        new Card(Suit.Spades, Value.Ace),

        new Card(Suit.Hearts, Value.Two),
        new Card(Suit.Hearts, Value.Three),
        new Card(Suit.Hearts, Value.Four),
        new Card(Suit.Hearts, Value.Five),
        new Card(Suit.Hearts, Value.Six),
        new Card(Suit.Hearts, Value.Seven),
        new Card(Suit.Hearts, Value.Eight),
        new Card(Suit.Hearts, Value.Nine),
        new Card(Suit.Hearts, Value.Ten),
        new Card(Suit.Hearts, Value.Jack),
        new Card(Suit.Hearts, Value.Queen),
        new Card(Suit.Hearts, Value.King),
        new Card(Suit.Hearts, Value.Ace),

        new Card(Suit.Diamonds, Value.Two),
        new Card(Suit.Diamonds, Value.Three),
        new Card(Suit.Diamonds, Value.Four),
        new Card(Suit.Diamonds, Value.Five),
        new Card(Suit.Diamonds, Value.Six),
        new Card(Suit.Diamonds, Value.Seven),
        new Card(Suit.Diamonds, Value.Eight),
        new Card(Suit.Diamonds, Value.Nine),
        new Card(Suit.Diamonds, Value.Ten),
        new Card(Suit.Diamonds, Value.Jack),
        new Card(Suit.Diamonds, Value.Queen),
        new Card(Suit.Diamonds, Value.King),
        new Card(Suit.Diamonds, Value.Ace),

        new Card(Suit.Clubs, Value.Two),
        new Card(Suit.Clubs, Value.Three),
        new Card(Suit.Clubs, Value.Four),
        new Card(Suit.Clubs, Value.Five),
        new Card(Suit.Clubs, Value.Six),
        new Card(Suit.Clubs, Value.Seven),
        new Card(Suit.Clubs, Value.Eight),
        new Card(Suit.Clubs, Value.Nine),
        new Card(Suit.Clubs, Value.Ten),
        new Card(Suit.Clubs, Value.Jack),
        new Card(Suit.Clubs, Value.Queen),
        new Card(Suit.Clubs, Value.King),
        new Card(Suit.Clubs, Value.Ace),
    ];

    /**
     * Utility function to check if two decks contain the same cards.
     * @param deck1 - First deck of cards.
     * @param deck2 - Second deck of cards.
     * @returns Whether the decks contain the same cards.
     */
    const decksContainSameCards = (deck1: Card[], deck2: Card[]): boolean => {
        const sortedDeck1 = [...deck1].sort((a, b) => a.toString().localeCompare(b.toString()));
        const sortedDeck2 = [...deck2].sort((a, b) => a.toString().localeCompare(b.toString()));

        return sortedDeck1.every((card, index) => card.toString() === sortedDeck2[index].toString());
    };

    /**
     * Utility function to count the number of differences between two decks.
     * @param deck1 - First deck of cards.
     * @param deck2 - Second deck of cards.
     * @returns The number of differences between the two decks.
     */
    const countDifferences = (deck1: Card[], deck2: Card[]): number => {
        return deck1.reduce((acc, card, index) => {
            return card.toString() !== (deck2[index]?.toString() || '') ? acc + 1 : acc;
        }, 0);
    };

    const testShuffler = (shuffler: FisherYatesShuffler | OverhandShuffler) => {
        test('should return a shuffled deck with the same cards', () => {
            const shuffledDeck = shuffler.shuffle(originalDeck);

            // Check that all cards are present
            expect(decksContainSameCards(originalDeck, shuffledDeck)).toBe(true);

            // Check that the order has changed
            const differences = countDifferences(originalDeck, shuffledDeck);
            expect(differences).toBeGreaterThan(0);
        });

        test('should not mutate the original deck', () => {
            const originalDeckCopy = [...originalDeck];
            shuffler.shuffle(originalDeck);
            expect(originalDeck).toEqual(originalDeckCopy);
        });

        test('should return a new array instance', () => {
            const shuffledDeck = shuffler.shuffle(originalDeck);
            expect(shuffledDeck).not.toBe(originalDeck);
        });
    };

    describe('FisherYatesShuffler', () => {
        const shuffler = new FisherYatesShuffler();
        testShuffler(shuffler);
    });

    describe('OverhandShuffler', () => {
        const shuffler = new OverhandShuffler();
        testShuffler(shuffler);
    });

    describe('Custom Shuffler Scenarios', () => {
        test('shuffler with empty deck should return empty array', () => {
            const shuffler = new FisherYatesShuffler();
            const emptyDeck: Card[] = [];
            const shuffledDeck = shuffler.shuffle(emptyDeck);
            expect(shuffledDeck).toEqual([]);
        });

        test('shuffler with single card should return the same single card', () => {
            const shuffler = new OverhandShuffler();
            const singleCardDeck: Card[] = [new Card(Suit.Spades, Value.Ace)];
            const shuffledDeck = shuffler.shuffle(singleCardDeck);
            expect(shuffledDeck).toEqual(singleCardDeck);
        });

        test('shuffler with two cards should swap or keep the same order', () => {
            const shuffler = new FisherYatesShuffler();
            const twoCardDeck: Card[] = [
                new Card(Suit.Spades, Value.Ace),
                new Card(Suit.Hearts, Value.King),
            ];
            const shuffledDeck = shuffler.shuffle(twoCardDeck);

            // Ensure all cards are present
            expect(decksContainSameCards(twoCardDeck, shuffledDeck)).toBe(true);

            // Since there are only two cards, they should either be in the same order or swapped
            const isSameOrder = twoCardDeck[0].toString() === shuffledDeck[0].toString() &&
                twoCardDeck[1].toString() === shuffledDeck[1].toString();
            const isSwapped = twoCardDeck[0].toString() === shuffledDeck[1].toString() &&
                twoCardDeck[1].toString() === shuffledDeck[0].toString();
            expect(isSameOrder || isSwapped).toBe(true);
        });
    });
});
