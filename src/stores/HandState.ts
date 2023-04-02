import { getRandomCard } from "@/data/Cards";
import type { Card } from "@/models/Card";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useHandStateStore = defineStore("handState", () => {
  const playerHand: Ref<Card[]> = ref([getRandomCard(), getRandomCard()]);
  const setPlayerHand = (cards: Card[]) => {
    playerHand.value = cards;
  };

  const playerHandNumbers: Ref<number[]> = ref([0]);
  const setPlayerHandNumbers = (numbers: number[]) =>
    (playerHandNumbers.value = numbers);

  const playerHandValue: Ref<number> = ref(0);
  const setPlayerHandValue = (value: number) => (playerHandValue.value = value);

  const dealerHand: Ref<Card[]> = ref([getRandomCard(), getRandomCard()]);
  const setDealerHand = (cards: Card[]) => (dealerHand.value = cards);

  const dealerHandNumbers: Ref<number[]> = ref([0]);
  const setDealerHandNumbers = (numbers: number[]) =>
    (dealerHandNumbers.value = numbers);

  const dealerHandValue: Ref<number> = ref(0);
  const setDealerHandValue = (value: number) => (dealerHandValue.value = value);

  const hit = (hand: Card[]) => {
    hand.push(getRandomCard());
  };

  const resetHands = () => {
    setPlayerHandValue(0);
    setDealerHandValue(0);
    setPlayerHandNumbers([]);
    setDealerHandNumbers([]);
    setPlayerHand([]);
    setDealerHand([]);
  };

  return {
    playerHand,
    setPlayerHand,
    playerHandNumbers,
    setPlayerHandNumbers,
    playerHandValue,
    setPlayerHandValue,
    dealerHand,
    setDealerHand,
    dealerHandNumbers,
    setDealerHandNumbers,
    dealerHandValue,
    setDealerHandValue,
    hit,
    resetHands,
  };
});
