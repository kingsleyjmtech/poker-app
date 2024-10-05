<template>
  <div class="shuffle-button">
    <button @click="shuffleHand">Shuffle and Deal</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {usePokerStore} from '@/stores/usePokerStore';

export default defineComponent({
  setup() {
    const pokerStore = usePokerStore();

    const shuffleHand = async () => {
      await pokerStore.shuffleHand();
    };

    return {
      shuffleHand,
    };
  },
});
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
