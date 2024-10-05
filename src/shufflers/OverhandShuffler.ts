import {ICard} from "../interfaces/ICard";
import {IShuffler} from "../interfaces/IShuffler";

/**
 * Class representing an overhand shuffler.
 */
export class OverhandShuffler implements IShuffler {
    /**
     * Shuffles the given cards using the overhand shuffling technique.
     * @param cards - The cards to shuffle.
     * @returns The shuffled cards.
     */
    shuffle(cards: ICard[]): ICard[] {
        const shuffled: ICard[] = [];
        const temp = [...cards];
        while (temp.length > 0) {
            const chunkSize = Math.floor(Math.random() * 5) + 1; // Random chunk size between 1 and 5
            const chunk = temp.splice(0, chunkSize);
            shuffled.unshift(...chunk); // Prepend to the shuffled array
        }
        return shuffled;
    }
}