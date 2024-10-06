import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios, { AxiosError } from 'axios'

interface DealResponse {
  hand: string[]
  evaluation: string
}

interface ErrorResponse {
  error: string
}

export const usePokerStore = defineStore('poker', () => {
  const hand = ref<string[]>([])
  const evaluation = ref<string>('')
  const errorMessage = ref<string>('')
  const statusCode = ref<number | null>(null)

  const shuffleHand = async () => {
    const url = 'http://localhost:3030/api/v1/deal'

    try {
      const response = await axios.get<DealResponse>(url)
      hand.value = response.data.hand
      evaluation.value = response.data.evaluation
      errorMessage.value = ''
      statusCode.value = null
    } catch (error) {
      console.error('Error fetching hand:', error)

      const axiosError = error as AxiosError<ErrorResponse>

      if (axiosError.response) {
        errorMessage.value = axiosError.response.data?.error || 'An error occurred'
        statusCode.value = axiosError.response.status
      } else if (axiosError.request) {
        errorMessage.value =
          'No response received from the server. Please try again (ensure the server is running).'
        statusCode.value = null
      } else {
        errorMessage.value = axiosError.message || 'An unexpected error occurred'
        statusCode.value = null
      }
    }
  }

  return {
    hand,
    evaluation,
    errorMessage,
    statusCode,
    shuffleHand
  }
})
