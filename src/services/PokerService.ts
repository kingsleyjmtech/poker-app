import { Deck } from "../models/Deck";
import { StandardPokerVariant } from "../variants/StandardPokerVariant";
import { BadugiVariant } from "../variants/BadugiVariant";
import { FisherYatesShuffler } from "../shufflers/FisherYatesShuffler";
import { OverhandShuffler } from "../shufflers/OverhandShuffler";
import { ICard } from "../interfaces/ICard";
import { IPokerService } from "../interfaces/IPokerService";
import { IShuffler } from "../interfaces/IShuffler";

export class PokerService implements IPokerService {
    private standardVariant: StandardPokerVariant;

    constructor() {
        this.standardVariant = new StandardPokerVariant();
    }

    public dealHand(
        handSize: number,
        variant: "standard" | "badugi",
        shufflerType: "fisherYates" | "overhand"
    ): { hand: string[], evaluation: string } {

        let shuffler: IShuffler;
        if (shufflerType === "fisherYates") {
            shuffler = new FisherYatesShuffler();
        } else if (shufflerType === "overhand") {
            shuffler = new OverhandShuffler();
        } else {
            throw new Error("Unknown shuffler type");
        }

        const deck = new Deck(shuffler);
        deck.shuffle();

        const hand: ICard[] = deck.deal(handSize);
        const handRepresentation = hand.map((card) => card.toString());

        let result: string;
        if (variant === "standard") {
            result = this.standardVariant.evaluateHand(hand);
        } else {
            const badugiVariant = new BadugiVariant();
            result = badugiVariant.evaluateHand(hand);
        }

        return {
            hand: handRepresentation,
            evaluation: result,
        };
    }
}
