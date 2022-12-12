<script setup lang="ts">
import { useAnimationStateStore } from "@/stores/AnimationState";
import { useGameStateStore } from "@/stores/GameState";
import { useHandStateStore } from "@/stores/HandState";
import { storeToRefs } from "pinia";
import { QBtn } from "quasar";

const gameStateStore = useGameStateStore();
const handStateStore = useHandStateStore();
const animationStateStore = useAnimationStateStore();
// const { animationIsRunning } = storeToRefs(animationStateStore);
</script>

<template>
  <div class="Button-List">
    <!-- Bet -->
    <!-- <q-btn
      class="q-mx-sm q-px-lg"
      color="blue"
      @click="
        {
        }
      "
      :disabled="
        gameStateStore.gameOver ||
        handStateStore.playerHandValue >= 21 ||
        animationStateStore.animationIsRunning ||
        gameStateStore.isDealersTurn
      "
    >
      Bet
    </q-btn> -->
    <!-- Hit -->
    <q-btn
      class="q-mx-sm q-px-lg"
      color="green"
      @click="handStateStore.hit(handStateStore.playerHand)"
      :disabled="
        gameStateStore.gameOver ||
        handStateStore.playerHandValue >= 21 ||
        animationStateStore.animationIsRunning ||
        gameStateStore.isDealersTurn
      "
    >
      Hit
    </q-btn>
    <!-- Stand -->
    <q-btn
      class="q-mx-sm q-px-lg"
      color="red"
      @click="gameStateStore.setIsDealersTurn(true)"
      :disabled="
        gameStateStore.gameOver ||
        handStateStore.playerHandValue >= 21 ||
        animationStateStore.animationIsRunning ||
        gameStateStore.isDealersTurn
      "
    >
      Stand
    </q-btn>
  </div>
</template>
