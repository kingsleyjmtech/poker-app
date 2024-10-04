import { Card } from "./Card";

export class Deck {
  suits: string[];
  values: string[];
  cards: Card[];

  constructor() {
    this.suits = ["♠", "♣", "♦", "♥"];
    this.values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    this.cards = [];

    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.cards.push(new Card(suit, value));
      });
    });
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(numCards: number): Card[] {
    return this.cards.splice(0, numCards);
  }
}
