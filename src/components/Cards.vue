<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { CARDS } from "../config/Config";

const randomIndex: Ref<number> = ref(Math.floor(Math.random() * CARDS.length));
const hand: Ref<string[]> = ref([]);

onMounted(() => {
  hand.value.push(CARDS[randomIndex.value]);
});
</script>

<template>
  <!-- <div class="Cards">
    <div class="Card" v-for="(card, index) in CARDS" :key="card">
      <div v-if="index % 13 == 0">new set</div>
      <img :src="card" alt="card" width="100" />
    </div>
  </div> -->
  <div class="Hand">
    <button
      @click="
        {
          randomIndex = Math.floor(Math.random() * CARDS.length);
          hand.push(CARDS[randomIndex]);
        }
      "
      :disabled="hand.length >= 3"
    >
      Hit
    </button>
    <div class="Card" v-for="(card, index) in hand" :key="card">
      <img :src="card" alt="card" width="100" />
    </div>
  </div>
</template>

<style></style>
