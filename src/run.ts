import { PokerService } from "./services/PokerService";

// Function to simulate shuffling and dealing a poker hand
function playPokerGame() {
    const pokerService = new PokerService();

    // Simulate shuffling with printed messages
    console.log("Shuffling ... Shuffling ... Shuffling ...");

    // Deal a 5-card hand using the Fisher-Yates shuffler and the Standard Poker variant
    const { hand, evaluation } = pokerService.dealHand(5, "standard", "fisherYates");

    // Format the hand to be printed
    const formattedHand = hand.join(" ");

    // Print the hand and the evaluation
    console.log(`Your hand: ${formattedHand}`);
    console.log(`You have: ${evaluation}`);
}

// Run the poker game
playPokerGame();
