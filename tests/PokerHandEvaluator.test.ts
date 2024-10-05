import {Card} from "../src/models/Card";
import {PokerHandEvaluator} from "../src/services/PokerHandEvaluator";
import {Suit} from "../src/enums/Suit";
import {Value} from "../src/enums/Value";

describe("PokerHandEvaluator", () => {
  test("should evaluate a straight flush", () => {
    const hand = [
      new Card(Suit.Spades, Value.Ten),
      new Card(Suit.Spades, Value.Jack),
      new Card(Suit.Spades, Value.Queen),
      new Card(Suit.Spades, Value.King),
      new Card(Suit.Spades, Value.Ace),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Straight Flush");
  });

  test("should evaluate a four of a kind", () => {
    const hand = [
      new Card(Suit.Spades, Value.Seven),
      new Card(Suit.Diamonds, Value.Seven),
      new Card(Suit.Clubs, Value.Seven),
      new Card(Suit.Hearts, Value.Seven),
      new Card(Suit.Spades, Value.King),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Four of a Kind");
  });

  test("should evaluate a full house", () => {
    const hand = [
      new Card(Suit.Spades, Value.King),
      new Card(Suit.Diamonds, Value.King),
      new Card(Suit.Spades, Value.Three),
      new Card(Suit.Diamonds, Value.Three),
      new Card(Suit.Clubs, Value.Three),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Full House");
  });

  test("should evaluate a flush", () => {
    const hand = [
      new Card(Suit.Spades, Value.Two),
      new Card(Suit.Spades, Value.Five),
      new Card(Suit.Spades, Value.Seven),
      new Card(Suit.Spades, Value.Ten),
      new Card(Suit.Spades, Value.Jack),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Flush");
  });

  test("should evaluate a straight", () => {
    const hand = [
      new Card(Suit.Spades, Value.Nine),
      new Card(Suit.Hearts, Value.Ten),
      new Card(Suit.Diamonds, Value.Jack),
      new Card(Suit.Clubs, Value.Queen),
      new Card(Suit.Spades, Value.King),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Straight");
  });

  test("should evaluate a three of a kind", () => {
    const hand = [
      new Card(Suit.Spades, Value.Eight),
      new Card(Suit.Diamonds, Value.Eight),
      new Card(Suit.Clubs, Value.Eight),
      new Card(Suit.Hearts, Value.Two),
      new Card(Suit.Spades, Value.Five),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Three of a Kind");
  });

  test("should evaluate two pair", () => {
    const hand = [
      new Card(Suit.Spades, Value.Jack),
      new Card(Suit.Hearts, Value.Jack),
      new Card(Suit.Clubs, Value.Five),
      new Card(Suit.Diamonds, Value.Five),
      new Card(Suit.Spades, Value.Queen),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Two Pair");
  });

  test("should evaluate one pair", () => {
    const hand = [
      new Card(Suit.Spades, Value.Four),
      new Card(Suit.Hearts, Value.Four),
      new Card(Suit.Clubs, Value.Six),
      new Card(Suit.Diamonds, Value.Nine),
      new Card(Suit.Spades, Value.King),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("One Pair");
  });

  test("should evaluate high card", () => {
    const hand = [
      new Card(Suit.Spades, Value.Three),
      new Card(Suit.Hearts, Value.Five),
      new Card(Suit.Clubs, Value.Nine),
      new Card(Suit.Diamonds, Value.Jack),
      new Card(Suit.Spades, Value.King),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("High Card (K)");
  });

  test("should evaluate the lowest high card", () => {
    const hand = [
      new Card(Suit.Spades, Value.Two),
      new Card(Suit.Hearts, Value.Three),
      new Card(Suit.Clubs, Value.Four),
      new Card(Suit.Diamonds, Value.Five),
      new Card(Suit.Spades, Value.Seven),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("High Card (7)");
  });

  test("should handle a royal straight flush", () => {
    const hand = [
      new Card(Suit.Spades, Value.Ten),
      new Card(Suit.Spades, Value.Jack),
      new Card(Suit.Spades, Value.Queen),
      new Card(Suit.Spades, Value.Ace),
      new Card(Suit.Spades, Value.King),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Straight Flush");
  });

  test("should handle a low straight (Ace as 1)", () => {
    const hand = [
      new Card(Suit.Spades, Value.Ace),
      new Card(Suit.Spades, Value.Two),
      new Card(Suit.Spades, Value.Three),
      new Card(Suit.Spades, Value.Four),
      new Card(Suit.Spades, Value.Five),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Straight Flush");
  });

  test("should handle ace as high card", () => {
    const hand = [
      new Card(Suit.Spades, Value.Two),
      new Card(Suit.Diamonds, Value.Four),
      new Card(Suit.Clubs, Value.Seven),
      new Card(Suit.Spades, Value.Queen),
      new Card(Suit.Hearts, Value.Ace),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("High Card (A)");
  });

  test("should evaluate a mixed hand with high card", () => {
    const hand = [
      new Card(Suit.Spades, Value.Two),
      new Card(Suit.Hearts, Value.Five),
      new Card(Suit.Diamonds, Value.Nine),
      new Card(Suit.Clubs, Value.Jack),
      new Card(Suit.Spades, Value.Ace),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("High Card (A)");
  });
});
