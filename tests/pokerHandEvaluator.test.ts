import {Card} from "../src/models/Card";
import {PokerHandEvaluator} from "../src/services/PokerHandEvaluator";

describe("PokerHandEvaluator", () => {
  test("should evaluate a straight flush", () => {
    const hand = [
      new Card("♠", "10"),
      new Card("♠", "J"),
      new Card("♠", "Q"),
      new Card("♠", "K"),
      new Card("♠", "A"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Straight Flush");
  });

  test("should evaluate a four of a kind", () => {
    const hand = [
      new Card("♠", "7"),
      new Card("♦", "7"),
      new Card("♣", "7"),
      new Card("♥", "7"),
      new Card("♠", "K"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Four of a Kind");
  });

  test("should evaluate a full house", () => {
    const hand = [
      new Card("♠", "K"),
      new Card("♦", "K"),
      new Card("♠", "3"),
      new Card("♦", "3"),
      new Card("♣", "3"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Full House");
  });

  test("should evaluate a flush", () => {
    const hand = [
      new Card("♠", "2"),
      new Card("♠", "5"),
      new Card("♠", "7"),
      new Card("♠", "10"),
      new Card("♠", "J"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Flush");
  });

  test("should evaluate a straight", () => {
    const hand = [
      new Card("♠", "9"),
      new Card("♥", "10"),
      new Card("♦", "J"),
      new Card("♣", "Q"),
      new Card("♠", "K"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Straight");
  });

  test("should evaluate a three of a kind", () => {
    const hand = [
      new Card("♠", "8"),
      new Card("♦", "8"),
      new Card("♣", "8"),
      new Card("♥", "2"),
      new Card("♠", "5"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Three of a Kind");
  });

  test("should evaluate two pair", () => {
    const hand = [
      new Card("♠", "J"),
      new Card("♥", "J"),
      new Card("♣", "5"),
      new Card("♦", "5"),
      new Card("♠", "Q"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Two Pair");
  });

  test("should evaluate one pair", () => {
    const hand = [
      new Card("♠", "4"),
      new Card("♥", "4"),
      new Card("♣", "6"),
      new Card("♦", "9"),
      new Card("♠", "K"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("One Pair");
  });

  test("should evaluate high card", () => {
    const hand = [
      new Card("♠", "3"),
      new Card("♥", "5"),
      new Card("♣", "9"),
      new Card("♦", "J"),
      new Card("♠", "K"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("High Card (K)");
  });

  test("should evaluate the lowest high card", () => {
    const hand = [
      new Card("♠", "2"),
      new Card("♥", "3"),
      new Card("♣", "4"),
      new Card("♦", "5"),
      new Card("♠", "7"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("High Card (7)");
  });

  test("should handle a royal straight flush", () => {
    const hand = [
      new Card("♠", "10"),
      new Card("♠", "J"),
      new Card("♠", "Q"),
      new Card("♠", "K"),
      new Card("♠", "A"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Straight Flush");
  });

  test("should handle a low straight (Ace as 1)", () => {
    const hand = [
      new Card("♠", "A"),
      new Card("♠", "2"),
      new Card("♠", "3"),
      new Card("♠", "4"),
      new Card("♠", "5"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("Straight Flush");
  });

  test("should handle ace as high card", () => {
    const hand = [
      new Card("♠", "2"),
      new Card("♦", "4"),
      new Card("♣", "7"),
      new Card("♠", "Q"),
      new Card("♥", "A"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("High Card (A)");
  });

  test("should evaluate a mixed hand with high card", () => {
    const hand = [
      new Card("♠", "2"),
      new Card("♥", "5"),
      new Card("♦", "9"),
      new Card("♣", "J"),
      new Card("♠", "A"),
    ];
    const result = PokerHandEvaluator.evaluate(hand);
    expect(result).toBe("High Card (A)");
  });
});
