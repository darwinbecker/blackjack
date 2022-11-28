import {
  getCardAce,
  getCardSix,
  getCardTen,
  getRandomCard,
} from "@/config/Cards";
import type { Card } from "@/models/Card";
import { defineStore } from "pinia";
import { readonly, ref, type Ref } from "vue";

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
  // const dealerHand: Ref<Card[]> = ref([getCardSix(), getCardTen()]);
  const setDealerHand = (cards: Card[]) => (dealerHand.value = cards);

  const dealerHandNumbers: Ref<number[]> = ref([0]);
  const setDealerHandNumbers = (numbers: number[]) =>
    (dealerHandNumbers.value = numbers);

  const dealerHandValue: Ref<number> = ref(0);
  const setDealerHandValue = (value: number) => (dealerHandValue.value = value);

  const hit = (hand: Card[]) => {
    hand.push(getRandomCard());
    // hand.push(getCardAce());
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
  };
});
