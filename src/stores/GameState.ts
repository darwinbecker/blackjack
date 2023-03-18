import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useGameStateStore = defineStore("gameState", () => {
  const gameOver: Ref<boolean> = ref(false);
  const setGameOver = (value: boolean) => (gameOver.value = value);

  const isBust: Ref<boolean> = ref(false);
  const setIsBust = (value: boolean) => (isBust.value = value);

  const isPush: Ref<boolean> = ref(false);
  const setIsPush = (value: boolean) => (isPush.value = value);

  const youWin: Ref<boolean> = ref(false);
  const setYouWin = (value: boolean) => (youWin.value = value);

  const isDealersTurn: Ref<boolean> = ref(false);
  const setIsDealersTurn = (value: boolean) => (isDealersTurn.value = value);

  const resetGameState = () => {
    setIsBust(false);
    setIsPush(false);
    setYouWin(false);
    setGameOver(false);
    setIsDealersTurn(false);
  };

  return {
    gameOver,
    setGameOver,
    isBust,
    setIsBust,
    isPush,
    setIsPush,
    youWin,
    setYouWin,
    isDealersTurn,
    setIsDealersTurn,
    resetGameState,
  };
});
