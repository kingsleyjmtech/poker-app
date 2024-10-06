<template>
  <button
    @click="shuffleHand"
    class="mt-6 sm:mt-10 px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-lg sm:text-xl rounded-full shadow-lg transition duration-300 ease-in-out"
  >
    {{ evaluation ? 'Shuffle and Deal Again' : 'Shuffle and Deal' }}
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePokerStore } from '@/stores/usePokerStore'

export default defineComponent({
  setup() {
    const pokerStore = usePokerStore()

    const evaluation = computed(() => pokerStore.evaluation)

    const shuffleHand = async () => {
      await pokerStore.shuffleHand()
    }

    return {
      shuffleHand,
      evaluation
    }
  }
})
</script>

<style scoped>
/*  */
</style>
