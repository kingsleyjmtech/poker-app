import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios, { AxiosError } from 'axios'

interface DealResponse {
  hand: string[]
  evaluation: string
}

interface ErrorResponse {
  message: string
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
        statusCode.value = axiosError.response.status
        const apiErrorMessage = axiosError.response.data?.message

        switch (statusCode.value) {
          case 400:
            errorMessage.value = apiErrorMessage || 'Bad Request: Invalid data provided.'
            break
          case 401:
            errorMessage.value = apiErrorMessage || 'Unauthorized: You need to log in to access this resource.'
            break
          case 403:
            errorMessage.value = apiErrorMessage || 'Forbidden: You do not have permission to access this resource.'
            break
          case 404:
            errorMessage.value = apiErrorMessage || 'Not Found: The requested resource could not be found.'
            break
          case 429:
            errorMessage.value = apiErrorMessage || 'Too Many Requests: You have reached the rate limit. Please try again later.'
            break
          case 500:
            errorMessage.value = apiErrorMessage || 'Internal Server Error: Something went wrong on the server.'
            break
          default:
            errorMessage.value = apiErrorMessage || 'An error occurred'
            break
        }
      } else if (axiosError.request) {
        errorMessage.value = 'No response received from the server. Please try again (ensure the server is running).'
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
