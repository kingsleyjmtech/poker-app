import express, {NextFunction, Request, Response} from "express";
import {PokerService} from "./services/PokerService";

const app = express();
const PORT = 3030;

const pokerService = new PokerService();

app.get("/api/v1/deal", (req: Request, res: Response) => {
    try {
        // Get the variant and shuffler from query parameters (defaults to "standard" variant and "fisherYates" shuffler)
        const variant = req.query.variant as "standard" | "badugi" || "standard";
        const shufflerType = req.query.shuffler as "fisherYates" | "overhand" || "fisherYates";

        // Deal and evaluate a poker hand based on the specified variant and shuffler
        const {hand, evaluation} = pokerService.dealHand(5, variant, shufflerType);

        res.json({
            hand,
            evaluation,
        });
    } catch (error) {
        res.status(400).json({
            error: (error as Error).message,
        });
    }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        error: err.message,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
