<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4">
    <header class="text-center mb-8">
      <h1 class="text-4xl sm:text-5xl font-bold mb-4">Poker Game</h1>
      <p class="text-lg sm:text-xl">Test your luck and skill with a hand of poker!</p>
    </header>

    <div class="bg-white text-gray-900 rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg text-center my-1">
      <h2 class="text-2xl sm:text-3xl font-semibold mb-6">
        Your Hand:
        <span v-for="(card, index) in hand" :key="index" :class="getCardColorClass(card)" class="mx-1">
          {{ card }}
        </span>
      </h2>
      <h3 class="text-xl sm:text-2xl text-green-500 font-bold mb-4">You have: {{ evaluation }}</h3>

      <div v-if="errorMessage" class="error text-red-600 text-sm sm:text-lg">
        <p>Error: {{ errorMessage }} ({{ statusCode }})</p>
      </div>
    </div>

    <ShuffleButton />

    <footer class="mt-8 sm:mt-12">
      <p class="text-sm sm:text-lg">&copy; {{ currentYear }} Poker World. All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { usePokerStore } from '@/stores/usePokerStore';
import ShuffleButton from './ShuffleButton.vue';

export default defineComponent({
  components: {
    ShuffleButton,
  },
  setup() {
    const pokerStore = usePokerStore();

    const hand = computed(() => pokerStore.hand);
    const evaluation = computed(() => pokerStore.evaluation);
    const errorMessage = computed(() => pokerStore.errorMessage);
    const statusCode = computed(() => pokerStore.statusCode);

    const getCardColorClass = (card: string) => {
      if (card.includes('♥') || card.includes('♦')) {
        return 'text-red-600';
      }
      return 'text-black';
    };

    const currentYear = new Date().getFullYear();

    return {
      hand,
      evaluation,
      errorMessage,
      statusCode,
      getCardColorClass,
      currentYear,
    };
  },
});
</script>

<style scoped>
/*  */
</style>
