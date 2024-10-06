import express, {NextFunction, Request, Response} from "express";
import {PokerService} from "./services/PokerService";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const UI_URL = process.env.UI_URL || "http://localhost:5173";

const pokerService = new PokerService();

// Whitelist local URLs and the UI URL from the .env file
const whitelist = [
    "http://localhost",
    "http://127.0.0.1",
    UI_URL,
];

// Set up CORS options to allow only whitelisted URLs
const corsOptions = {
    origin: function (origin: string | undefined, callback: Function) {
        if (!origin || whitelist.some((url) => origin.startsWith(url))) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

// Use CORS with the defined options
app.use(cors(corsOptions));

// Set up rate limiter middleware (limits to 60 requests per minute per IP)
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 60, // limit each IP to 60 requests per windowMs
    message: "Too many requests from this IP, please try again after a minute.",
});

// Apply the rate limiter to all requests
app.use(limiter);

// Middleware to parse JSON request body
app.use(express.json());

// Deal route
app.get("/api/v1/deal", (req: Request, res: Response) => {
    try {
        const variant = req.query.variant as "standard" | "badugi" || "standard";
        const shufflerType =
            req.query.shuffler as "fisherYates" | "overhand" || "fisherYates";

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

// Ping route (GET)
app.get("/api/v1/ping", (req: Request, res: Response) => {
    res.json({message: "Pong", timestamp: new Date().toISOString()});
});

// Ping route (POST)
app.post("/api/v1/ping", (req: Request, res: Response) => {
    const {data} = req.body;
    res.json({
        message: "Pong",
        receivedData: data,
        timestamp: new Date().toISOString(),
    });
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
