import {IDeck} from "../interfaces/IDeck";
import {IShuffler} from "../interfaces/IShuffler";
import {Card} from "./Card";
import {Suit} from "../enums/Suit";
import {Value} from "../enums/Value";

/**
 * Class representing a deck of cards.
 */
export class Deck implements IDeck {
  suits: Suit[];
  values: Value[];
  cards: Card[];
  private shuffler: IShuffler;

  /**
   * Creates a new `Deck` instance.
   * @param shuffler - The shuffling algorithm to use.
   */
  constructor(shuffler: IShuffler) {
    this.suits = [Suit.Spades, Suit.Clubs, Suit.Diamonds, Suit.Hearts];
    this.values = [
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
    this.cards = [];

    this.shuffler = shuffler;
    this.initializeDeck();
    this.shuffle();
  }


  /**
   * Initializes the deck with all 52 cards.
   */
  initializeDeck(): void {
    this.cards = [];
    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.cards.push(new Card(suit, value));
      });
    });
  }

  /**
   * Shuffles the deck.
   */
  shuffle(): void {
    this.cards = this.shuffler.shuffle(this.cards);
  }

  /**
   * Deals a specified number of cards from the deck.
   * @param numCards - The number of cards to deal.
   * @returns An array of cards.
   */
  deal(numCards: number): Card[] {
    if (numCards > this.cards.length) {
      throw new Error("Not enough cards left in the deck to deal.");
    }
    return this.cards.splice(0, numCards);
  }

  /**
   * Resets the deck by initializing and shuffling it.
   */
  reset(): void {
    this.initializeDeck();
    this.shuffle();
  }
}
