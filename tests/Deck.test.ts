import {Deck} from '../src/models/Deck';
import {FisherYatesShuffler} from '../src/shufflers/FisherYatesShuffler';
import {OverhandShuffler} from '../src/shufflers/OverhandShuffler';

describe('Deck', () => {
    let deck: Deck;

    beforeEach(() => {
        deck = new Deck(new FisherYatesShuffler());
    });

    test('should initialize with 52 unique cards', () => {
        expect(deck.cards.length).toBe(52);
        const uniqueCards = new Set(deck.cards.map(card => card.toString()));
        expect(uniqueCards.size).toBe(52);
    });

    test('should shuffle the deck', () => {
        const originalOrder = [...deck.cards];
        deck.shuffle();
        const shuffledOrder = deck.cards;
        expect(shuffledOrder).not.toEqual(originalOrder);
        const originalSorted = [...originalOrder].sort((a, b) => a.toString().localeCompare(b.toString()));
        const shuffledSorted = [...shuffledOrder].sort((a, b) => a.toString().localeCompare(b.toString()));
        for (let i = 0; i < originalSorted.length; i++) {
            expect(shuffledSorted[i].toString()).toBe(originalSorted[i].toString());
        }
    });

    test('should deal the correct number of cards', () => {
        const hand = deck.deal(5);
        expect(hand.length).toBe(5);
        expect(deck.cards.length).toBe(47);
    });

    test('should throw an error when dealing more cards than available', () => {
        expect(() => deck.deal(60)).toThrow('Not enough cards left in the deck to deal.');
    });

    test('should reset the deck to 52 unique cards', () => {
        deck.deal(10);
        expect(deck.cards.length).toBe(42);
        deck.reset();
        expect(deck.cards.length).toBe(52);
        const uniqueCards = new Set(deck.cards.map(card => card.toString()));
        expect(uniqueCards.size).toBe(52);
    });

    test('should allow changing the shuffler', () => {
        const newShuffler = new OverhandShuffler();
        deck.setShuffler(newShuffler);
        expect(deck['shuffler']).toBe(newShuffler);
        // Ensure the deck is shuffled with the new shuffler
        const newOrder = [...deck.cards];
        deck.shuffle();
        expect(deck.cards).not.toEqual(newOrder);
    });
});
