import express, {NextFunction, Request, Response} from "express";
import {PokerService} from "./services/PokerService";
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 3030;

const pokerService = new PokerService();

// Set up CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Set up rate limiter middleware (limits to 60 requests per minute per IP)
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 60, // limit each IP to 60 requests per windowMs
    message: 'Too many requests from this IP, please try again after a minute.'
});

// Apply the rate limiter to all requests
app.use(limiter);

// Deal route
app.get("/api/v1/deal", (req: Request, res: Response) => {
    try {
        const variant = req.query.variant as "standard" | "badugi" || "standard";
        const shufflerType = req.query.shuffler as "fisherYates" | "overhand" || "fisherYates";

        const {hand, evaluation} = pokerService.dealHand(5, variant, shufflerType);

        res.json({
            hand,
            evaluation,
        });
    } catch (error) {
        res.status(400).json({
            message: (error as Error).message,
        });
    }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
