/**
 * Interface for the poker service.
 */
export interface IPokerService {
    /**
     * Deals a hand of poker and evaluates it.
     * @param handSize - The number of cards to deal.
     * @param variant - The variant of poker to use ("standard" or "badugi").
     * @param shufflerType - The type of shuffler to use ("fisherYates" or "overhand").
     * @returns An object containing the hand and the evaluation result.
     */
    dealHand(
        handSize: number,
        variant: "standard" | "badugi",
        shufflerType: "fisherYates" | "overhand"
    ): { hand: string[], evaluation: string };
}
