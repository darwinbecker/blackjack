<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from "vue";
import {
  CARDS_FULL,
  determineBestHandValue,
  parseCardValue,
} from "../config/Config";
import type { Card } from "../models/Card";

const randomIndex: Ref<number> = ref(
  Math.floor(Math.random() * CARDS_FULL.length)
  // 11
);
const hand: Ref<Card[]> = ref([CARDS_FULL[randomIndex.value] as Card]);
const handNumbers: Ref<number[]> = ref(
  hand.value.map((card) => parseCardValue(card.value))
);

const handValue: Ref<number> = ref(determineBestHandValue(handNumbers.value));

const isBust: Ref<boolean> = ref(false);
const gameOver: Ref<boolean> = ref(false);

onMounted(() => {
  console.log(hand.value[0]);
});

watch(
  hand,
  (newHand) => {
    handNumbers.value = newHand.map((card) => parseCardValue(card.value));
    handValue.value = determineBestHandValue(handNumbers.value);

    if (handValue.value > 21) {
      isBust.value = true;
      gameOver.value = true;
    } else if (handValue.value === 21) {
      isBust.value = false;
      gameOver.value = true;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<template>
  <!-- <div class="Cards">
    <div class="Card" v-for="(card, index) in CARDS" :key="card">
      <div v-if="index % 13 == 0">new set</div>
      <img :src="card" alt="card" width="100" />
    </div>
  </div> -->
  <div class="Blackjack">
    <div class="Hand">
      <div class="Card" v-for="(card, index) in hand" :key="card.id">
        <img :src="card.image" alt="card" width="100" />
      </div>
    </div>
    <div>Value: {{ handValue }}</div>

    <v-btn
      class="mx-2"
      color="blue"
      elevation="4"
      x-large
      @click="
        {
        }
      "
      :disabled="gameOver || handValue >= 21"
    >
      <!-- <v-icon x-large> mdi-plus</v-icon> -->
      Bet
    </v-btn>
<!-- Hi -->
    <v-btn
      class="mx-2"
      color="green"
      elevation="4"
      x-large
      @click="
        {
          randomIndex = Math.floor(Math.random() * CARDS_FULL.length);
          hand.push(CARDS_FULL[randomIndex]);
        }
      "
      :disabled="gameOver || handValue >= 21"
    >
      <!-- <v-icon x-large> mdi-plus</v-icon> -->
      Hit
    </v-btn>

    <v-btn
      class="mx-2"
      color="red"
      elevation="4"
      x-large
      @click="
        {
          gameOver = true;
        }
      "
      :disabled="gameOver || handValue >= 21"
    >
      Stand
    </v-btn>

    <div v-if="gameOver">
      <div v-if="handValue === 21">YOU WIN!</div>
      <div v-else-if="isBust">YOU LOSE!</div>

      <v-btn
        color="orange"
        elevation="4"
        x-large
        @click="
          {
            randomIndex = Math.floor(Math.random() * CARDS_FULL.length);
            hand = [CARDS_FULL[randomIndex]];
            isBust = false;
            gameOver = false;
          }
        "
      >
        Play Again
      </v-btn>
    </div>
  </div>
</template>

<style>
.Blackjack {
  margin: 0 auto;
  text-align: center;
}

.Hand {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.Hit-Button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 6px;

  /* box-shadow: 0 9px #489e4b; */
  /* transition: 3s; */
}

.Hit-Button:hover {
  background-color: #3e8e41;
  transition: background-color 0.2s;
}

.Hit-Button:active {
  background-color: #3e8e41;
  /* transform: translateY(2px);
  transition: transform 0.2s; */
  color: black;
}

.Hit-Button:disabled {
  background-color: #ccc;
  transform: none;
  color: #666;
  cursor: not-allowed;
}

.Play-Again-Button {
  background-color: #a8af4c;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 6px;

  /* box-shadow: 0 9px #489e4b; */
  /* transition: 3s; */
}

.Play-Again-Button:hover {
  background-color: #8c8f3e;
  transition: background-color 0.2s;
}

.Play-Again-Button:active {
  background-color: #8c8f3e;
  transform: translateY(2px);
  transition: transform 0.2s;
  color: black;
}
</style>
