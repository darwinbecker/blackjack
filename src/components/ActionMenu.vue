<script setup lang="ts">
import { useAnimationStateStore } from "@/stores/AnimationState";
import { useGameStateStore } from "@/stores/GameState";
import { useHandStateStore } from "@/stores/HandState";
import { QBtn } from "quasar";

const gameStateStore = useGameStateStore();
const handStateStore = useHandStateStore();
const animationStateStore = useAnimationStateStore();
</script>

<template>
  <div class="row justify-center q-gutter-x-md q-my-md">
    <!-- Hit -->
    <q-btn
      class="q-mx-sm q-px-lg col-3"
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
      class="q-mx-sm q-px-lg col-3"
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
<style></style>
