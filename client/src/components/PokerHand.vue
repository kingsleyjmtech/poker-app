<template>
  <div class="poker-hand">
    <h2>Your hand: {{ formattedHand }}</h2>
    <h3>You have: {{ evaluation }}</h3>

    <div v-if="errorMessage" class="error">
      <p>Error: {{ errorMessage }} ({{ statusCode }})</p>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {usePokerStore} from '@/stores/usePokerStore';

export default defineComponent({
  setup() {
    const pokerStore = usePokerStore(); // Use the store

    // Computed properties to get the formatted hand and evaluation
    const formattedHand = computed(() => pokerStore.hand.join(' '));
    const evaluation = computed(() => pokerStore.evaluation);
    const errorMessage = computed(() => pokerStore.errorMessage);
    const statusCode = computed(() => pokerStore.statusCode);

    return {
      formattedHand,
      evaluation,
      errorMessage,
      statusCode,
    };
  },
});
</script>

<style scoped>
.poker-hand {
  margin: 20px 0;
}
</style>
