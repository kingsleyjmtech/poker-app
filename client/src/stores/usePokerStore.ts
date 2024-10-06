import {defineStore} from 'pinia';
import {ref} from 'vue';
import axios from 'axios';

interface DealResponse {
    hand: string[];
    evaluation: string;
}

export const usePokerStore = defineStore('poker', () => {
    // State: hand and evaluation
    const hand = ref<string[]>([]);
    const evaluation = ref<string>('');
    const errorMessage = ref<string>('');
    const statusCode = ref<number | null>(null);

    // Action: shuffleHand that fetches from the backend using the localhost URL
    const shuffleHand = async () => {
        const url = 'http://localhost:3030/api/v1/deal';

        try {
            const response = await axios.get<DealResponse>(url);
            hand.value = response.data.hand;
            evaluation.value = response.data.evaluation;
            errorMessage.value = '';
            statusCode.value = null
        } catch (error) {
            console.error('Error fetching hand:', error);

            if (error.response) {
                errorMessage.value = error.response.data.error || 'An error occurred';
                statusCode.value = error.response.status;
            } else if (error.request) {
                errorMessage.value = 'No response received from the server please try again (note that the server must be running)';
                statusCode.value = null;
            } else {
                errorMessage.value = error.message || 'An unexpected error occurred';
                statusCode.value = null;
            }
        }
    };

    return {
        hand,
        evaluation,
        errorMessage,
        statusCode,
        shuffleHand,
    };
});
