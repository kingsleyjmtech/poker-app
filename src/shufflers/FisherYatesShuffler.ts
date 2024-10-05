import {ICard} from "../interfaces/ICard";
import {IShuffler} from "../interfaces/IShuffler";

/**
 * Class representing a Fisher-Yates shuffler.
 */
export class FisherYatesShuffler implements IShuffler {
    /**
     * Shuffles the given cards using the Fisher-Yates algorithm.
     * @param cards - The cards to shuffle.
     * @returns The shuffled cards.
     */
    shuffle(cards: ICard[]): ICard[] {
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}