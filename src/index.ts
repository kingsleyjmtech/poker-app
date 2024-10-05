import express, {Request, Response} from "express";
import {Deck} from "./models/Deck";
import {PokerHandEvaluator} from "./services/PokerHandEvaluator";

const app = express();
const PORT = 3030;

app.get("/api/v1/deal", (req: Request, res: Response) => {
    const deck = new Deck();
    deck.shuffle();

    const hand = deck.deal(5);
    const handRepresentation = hand.map((card) => card.toString());

    const result = PokerHandEvaluator.evaluate(hand);

    res.json({
        hand: handRepresentation,
        evaluation: result,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
