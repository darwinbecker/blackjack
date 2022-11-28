<script setup lang="ts">
import { nextTick, onMounted, ref, watch, type Ref } from "vue";
import { getRandomCard } from "../config/Cards";
import { determineBestHandValue, parseCardValue } from "../lib/HandValue";
import {
  REVEAL_CARD_DELAY_MS,
  REVEAL_HAND_VALUE_DELAY_MS,
} from "../config/Config";
import BounceInAnimation from "./BounceInAnimation.vue";
import CardItem from "./CardItem.vue";

import { useGameStateStore } from "../stores/GameState";
import { useHandStateStore } from "../stores/HandState";
import { storeToRefs } from "pinia";
import { useAnimationStateStore } from "@/stores/AnimationState";
import ActionMenu from "./ActionMenu.vue";

const gameStateStore = useGameStateStore();
const handStateStore = useHandStateStore();
const animationStateStore = useAnimationStateStore();

const { isDealersTurn } = storeToRefs(gameStateStore);
const { playerHand, dealerHand } = storeToRefs(handStateStore);
const { animationIsRunning } = storeToRefs(animationStateStore);

onMounted(() => {
  // reveal players hand
  animationIsRunning.value = true;
  nextTick(() => {
    const playerCards = document.querySelectorAll(
      ".Playercard.flip-card-inner"
    );
    playerCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("is-flipped");
        setTimeout(() => {
          handStateStore.setPlayerHandNumbers([
            ...handStateStore.playerHandNumbers,
            parseCardValue(handStateStore.playerHand[index].value),
          ]);

          handStateStore.setPlayerHandValue(
            determineBestHandValue(handStateStore.playerHandNumbers)
          );

          checkHandValue();
        }, REVEAL_HAND_VALUE_DELAY_MS);
      }, REVEAL_CARD_DELAY_MS * (index + 1));
    });

    // reveal dealers hand
    const dealerCards = document.querySelectorAll(
      ".Dealercard.flip-card-inner"
    );
    setTimeout(() => {
      dealerCards[0].classList.add("is-flipped");
      setTimeout(() => {
        handStateStore.setDealerHandNumbers([
          parseCardValue(handStateStore.dealerHand[0].value),
        ]);

        handStateStore.setDealerHandValue(
          determineBestHandValue(handStateStore.dealerHandNumbers)
        );

        animationIsRunning.value = false;
      }, REVEAL_HAND_VALUE_DELAY_MS);
    }, REVEAL_CARD_DELAY_MS * (playerCards.length + 1));
  });
});

watch(
  playerHand,
  (newHand) => {
    nextTick(() => {
      animationIsRunning.value = true;
      const playerCards = document.querySelectorAll(
        ".Playercard.flip-card-inner"
      );
      if (playerCards.length == 0) {
        animationIsRunning.value = false;
        return;
      }

      if (playerCards.length > 2) {
        // this is a hack to get the last card to flip
        setTimeout(() => {
          playerCards[playerCards.length - 1].classList.add("is-flipped");
          setTimeout(() => {
            handStateStore.setPlayerHandNumbers([
              ...handStateStore.playerHandNumbers,
              parseCardValue(
                handStateStore.playerHand[handStateStore.playerHand.length - 1]
                  .value
              ),
            ]);

            handStateStore.setPlayerHandValue(
              determineBestHandValue(handStateStore.playerHandNumbers)
            );
            checkHandValue();

            animationIsRunning.value = false;
          }, REVEAL_HAND_VALUE_DELAY_MS);
        }, REVEAL_CARD_DELAY_MS);
      } else {
        // restart game => reveal players hand
        playerCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("is-flipped");
            setTimeout(() => {
              handStateStore.setPlayerHandNumbers([
                ...handStateStore.playerHandNumbers,
                parseCardValue(handStateStore.playerHand[index].value),
              ]);

              handStateStore.setPlayerHandValue(
                determineBestHandValue(handStateStore.playerHandNumbers)
              );
              checkHandValue();
            }, REVEAL_HAND_VALUE_DELAY_MS);
          }, REVEAL_CARD_DELAY_MS * (index + 1));
        });

        // reveal dealers first card
        const dealerCards = document.querySelectorAll(
          ".Dealercard.flip-card-inner"
        );
        setTimeout(() => {
          dealerCards[0].classList.add("is-flipped");
          setTimeout(() => {
            handStateStore.setDealerHandNumbers([
              parseCardValue(handStateStore.dealerHand[0].value),
            ]);

            handStateStore.setDealerHandValue(
              determineBestHandValue(handStateStore.dealerHandNumbers)
            );

            animationIsRunning.value = false;
          }, REVEAL_HAND_VALUE_DELAY_MS);
        }, REVEAL_CARD_DELAY_MS * (playerCards.length + 1));
      }
    });
  },
  { deep: true }
);

watch(
  [dealerHand, isDealersTurn],
  ([newDealerHand, newIsDealersTurn]) => {
    if (!newIsDealersTurn) return;

    nextTick(() => {
      animationIsRunning.value = true;
      const dealerCards = document.querySelectorAll(
        ".Dealercard.flip-card-inner"
      );
      if (dealerCards.length == 0) {
        animationIsRunning.value = false;
        return;
      }

      if (dealerCards.length === 2) {
        // this is a hack to get the last card to flip
        setTimeout(() => {
          dealerCards[dealerCards.length - 1].classList.add("is-flipped");
          setTimeout(() => {
            handStateStore.setDealerHandNumbers([
              ...handStateStore.dealerHandNumbers,
              parseCardValue(
                handStateStore.dealerHand[handStateStore.dealerHand.length - 1]
                  .value
              ),
            ]);

            handStateStore.setDealerHandValue(
              determineBestHandValue(handStateStore.dealerHandNumbers)
            );
            checkDealerHandValue();

            animationIsRunning.value = false;
          }, REVEAL_HAND_VALUE_DELAY_MS);
        }, REVEAL_CARD_DELAY_MS);
      } else {
        setTimeout(() => {
          dealerCards[dealerCards.length - 1].classList.add("is-flipped");
          setTimeout(() => {
            handStateStore.setDealerHandNumbers([
              ...handStateStore.dealerHandNumbers,
              parseCardValue(
                handStateStore.dealerHand[handStateStore.dealerHand.length - 1]
                  .value
              ),
            ]);

            // TODO: here is a Bug
            handStateStore.setDealerHandValue(
              determineBestHandValue(handStateStore.dealerHandNumbers)
            );
            console.log("dealerHandNumbers", handStateStore.dealerHandNumbers);
            checkDealerHandValue();

            animationIsRunning.value = false;
          }, REVEAL_HAND_VALUE_DELAY_MS);
        }, REVEAL_CARD_DELAY_MS);
      }
    });
  },
  { deep: true }
);

const checkDealerHandValue = () => {
  if (
    handStateStore.dealerHandValue > 16 &&
    handStateStore.dealerHandValue < 22 &&
    handStateStore.dealerHandValue > handStateStore.playerHandValue
  ) {
    gameStateStore.setYouWin(false);
    gameStateStore.setGameOver(true);
  } else if (
    handStateStore.dealerHandValue === handStateStore.playerHandValue &&
    handStateStore.dealerHandValue > 16
  ) {
    gameStateStore.setIsPush(true);
    gameStateStore.setGameOver(true);
  } else if (handStateStore.dealerHandValue > 16) {
    gameStateStore.setYouWin(true);
    gameStateStore.setGameOver(true);
  } else {
    handStateStore.hit(handStateStore.dealerHand);
  }
};

const checkHandValue = () => {
  if (handStateStore.playerHandValue > 21) {
    gameStateStore.setIsBust(true);
    gameStateStore.setGameOver(true);
  } else if (handStateStore.playerHandValue === 21) {
    gameStateStore.setIsBust(false);
    gameStateStore.setYouWin(true);
    gameStateStore.setGameOver(true);
  }
};

const resetGame = async () => {
  isDealersTurn.value = false;
  gameStateStore.setIsBust(false);
  gameStateStore.setIsPush(false);
  gameStateStore.setYouWin(false);
  gameStateStore.setGameOver(false);
  handStateStore.setPlayerHandValue(0);
  handStateStore.setDealerHandValue(0);
  handStateStore.setPlayerHandNumbers([]);
  handStateStore.setDealerHandNumbers([]);
  handStateStore.setPlayerHand([]);
  handStateStore.setDealerHand([]);
  nextTick(() => {
    handStateStore.setPlayerHand([getRandomCard(), getRandomCard()]);
    handStateStore.setDealerHand([getRandomCard(), getRandomCard()]);
  });
};
</script>

<template>
  <div class="Blackjack">
    <div class="Dealer">
      <div
        class="Card"
        v-for="(card, index) in handStateStore.dealerHand"
        :key="card.id + '-' + index"
      >
        <CardItem class="HiddenCard" :card="card" :isDealer="true"></CardItem>
      </div>
    </div>
    <p>Value: {{ handStateStore.dealerHandValue }}</p>

    <div class="Hand">
      <div
        class="Card"
        v-for="(card, index) in handStateStore.playerHand"
        :key="card.id + '-' + index"
      >
        <CardItem :card="card" :isDealer="false"></CardItem>
        <!-- <img :src="card.image" alt="card" width="100" /> -->
      </div>
    </div>
    <p>Value: {{ handStateStore.playerHandValue }}</p>

    <ActionMenu />

    <BounceInAnimation>
      <h3 v-if="gameStateStore.gameOver && gameStateStore.youWin">You Win!</h3>
    </BounceInAnimation>
    <div v-if="gameStateStore.gameOver">
      <div v-if="gameStateStore.youWin"></div>
      <div v-else-if="gameStateStore.isPush">PUSH</div>
      <div v-else>You Lose.</div>

      <q-btn color="orange" @click="resetGame"> Play Again </q-btn>
    </div>
  </div>
</template>

<style>
.Blackjack {
  margin: 0 auto;
  text-align: center;
}

.Hand,
.Dealer {
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
