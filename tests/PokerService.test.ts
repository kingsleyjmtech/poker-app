import {PokerService} from "../src/services/PokerService";

describe("PokerService", () => {
    let pokerService: PokerService;

    beforeEach(() => {
        pokerService = new PokerService();
    });

    test("should deal a 5-card hand using Fisher-Yates shuffler and standard poker variant", () => {
        const {hand, evaluation} = pokerService.dealHand(5, "standard", "fisherYates");

        expect(hand.length).toBe(5);
        expect(evaluation).toBeDefined();  // Check that evaluation exists
        expect(new Set(hand).size).toBe(5);  // Ensure there are no duplicate cards
    });

    test("should deal a 5-card hand using Overhand shuffler and standard poker variant", () => {
        const {hand, evaluation} = pokerService.dealHand(5, "standard", "overhand");

        expect(hand.length).toBe(5);
        expect(evaluation).toBeDefined();
        expect(new Set(hand).size).toBe(5);  // Ensure there are no duplicate cards
    });

    test("should deal a 4-card hand using Overhand shuffler and Badugi poker variant", () => {
        const {hand, evaluation} = pokerService.dealHand(4, "badugi", "overhand");

        expect(hand.length).toBe(4);
        expect(evaluation).toBe("Badugi Hand");  // Check that it uses the Badugi variant
        expect(new Set(hand).size).toBe(4);  // Ensure there are no duplicate cards
    });

    test("should deal a 4-card hand using Fisher-Yates shuffler and Badugi poker variant", () => {
        const {hand, evaluation} = pokerService.dealHand(4, "badugi", "fisherYates");

        expect(hand.length).toBe(4);  // Ensure the hand has 4 cards
        expect(evaluation).toBe("Badugi Hand");  // Ensure Badugi variant logic works
        expect(new Set(hand).size).toBe(4);  // Ensure there are no duplicate cards
    });

    test("should throw an error for an invalid shuffler type", () => {
        expect(() => pokerService.dealHand(5, "standard", "invalidShuffler" as any)).toThrow("Unknown shuffler type");
    });

    test("should throw an error for an invalid poker variant", () => {
        expect(() => pokerService.dealHand(5, "invalidVariant" as any, "fisherYates")).toThrow();
    });

    test("should throw an error when dealing more than 4 cards in Badugi variant", () => {
        expect(() => pokerService.dealHand(5, "badugi", "fisherYates")).toThrow("A 4-card hand is required.");
    });

    test("should throw an error when dealing fewer than 5 cards in Standard variant", () => {
        expect(() => pokerService.dealHand(4, "standard", "fisherYates")).toThrow("A 5-card hand is required.");
    });

    test("should throw an error when trying to deal more cards than available in the deck", () => {
        expect(() => pokerService.dealHand(60, "standard", "fisherYates")).toThrow("Not enough cards left in the deck to deal.");
    });
});
