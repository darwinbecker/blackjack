<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import { getCardSeven, getRandomCard } from "../data/Cards";
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

// this function is called at the (re-)start of the game
const revealPlayerHand = (playerCards: NodeListOf<Element>) => {
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
};

// TODO: refactor this: also use this function to reveal dealers hand
// param: more generic and checkHanvalue should optional or be called from outside
const revealSingleCard = (cardElement: Element) => {
  setTimeout(() => {
    cardElement.classList.add("is-flipped");
    setTimeout(() => {
      handStateStore.setPlayerHandNumbers([
        ...handStateStore.playerHandNumbers,
        parseCardValue(
          handStateStore.playerHand[handStateStore.playerHand.length - 1].value
        ),
      ]);

      handStateStore.setPlayerHandValue(
        determineBestHandValue(handStateStore.playerHandNumbers)
      );
      // TODO: make this optional for the dealer
      checkHandValue();

      animationIsRunning.value = false;
    }, REVEAL_HAND_VALUE_DELAY_MS);
  }, REVEAL_CARD_DELAY_MS);
};

const revealSingleDealerCard = (
  cardElement: Element,
  dealerHandValue: string,
  checkHandValue?: boolean,
  animationDelay?: number
) => {
  setTimeout(
    () => {
      cardElement.classList.add("is-flipped");
      setTimeout(() => {
        handStateStore.setDealerHandNumbers([
          ...handStateStore.dealerHandNumbers,
          parseCardValue(dealerHandValue),
        ]);

        handStateStore.setDealerHandValue(
          determineBestHandValue(handStateStore.dealerHandNumbers)
        );
        console.log("dealerHandNumbers", handStateStore.dealerHandNumbers);
        if (checkHandValue) {
          checkDealerHandValue();
        }

        animationIsRunning.value = false;
      }, REVEAL_HAND_VALUE_DELAY_MS);
    },
    animationDelay
      ? REVEAL_CARD_DELAY_MS * animationDelay
      : REVEAL_CARD_DELAY_MS
  );
};

onMounted(() => {
  resetGame();
  // reveal players hand
  animationIsRunning.value = true;
  nextTick(() => {
    const playerCards = document.querySelectorAll(
      ".Playercard.flip-card-inner"
    );
    revealPlayerHand(playerCards);

    // reveal dealers hand
    const dealerCards = document.querySelectorAll(
      ".Dealercard.flip-card-inner"
    );

    if (!dealerCards.length) {
      animationIsRunning.value = false;
      return;
    }

    revealSingleDealerCard(
      dealerCards[0],
      handStateStore.dealerHand[0].value,
      false,
      playerCards.length + 1
    );
  });
});

onBeforeUnmount(() => {
  resetGame();
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
        revealSingleCard(playerCards[playerCards.length - 1]);
      } else {
        // restart game => reveal players hand
        revealPlayerHand(playerCards);

        // reveal dealers first card
        const dealerCards = document.querySelectorAll(
          ".Dealercard.flip-card-inner"
        );

        revealSingleDealerCard(
          dealerCards[0],
          handStateStore.dealerHand[0].value,
          false,
          playerCards.length + 1
        );
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
      revealSingleDealerCard(
        dealerCards[dealerCards.length - 1],
        handStateStore.dealerHand[dealerCards.length - 1].value,
        true
      );
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
  } else if (
    handStateStore.playerHandValue === 21 &&
    handStateStore.playerHand.length === 2
  ) {
    gameStateStore.setIsBust(false);
    gameStateStore.setYouWin(true);
    gameStateStore.setGameOver(true);
  } else if (handStateStore.playerHandValue === 21) {
    gameStateStore.setIsDealersTurn(true);
  }
};

const resetGame = async () => {
  // isDealersTurn.value = false;
  gameStateStore.resetGameState();
  handStateStore.resetHands();
  nextTick(() => {
    handStateStore.setPlayerHand([getRandomCard(), getRandomCard()]);
    handStateStore.setDealerHand([getRandomCard(), getRandomCard()]);
  });
};
</script>

<template>
  <div class="Blackjack column justify-center q-gutter-y-xl">
    <div class="Dealer-Wrapper">
      <h4 class="q-mb-md">Dealer</h4>
      <div class="Dealer-Cards">
        <div
          class="Card"
          v-for="(card, index) in handStateStore.dealerHand"
          :key="card.id + '-' + index"
        >
          <CardItem class="HiddenCard" :card="card" :isDealer="true"></CardItem>
        </div>
      </div>
      <p>Value: {{ handStateStore.dealerHandValue }}</p>
    </div>

    <div>
      <div class="Hand-Wrapper">
        <div class="Hand-Cards">
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
        <h4 style="margin: 20px 0">You</h4>
      </div>

      <div class="buttons-wrapper">
        <ActionMenu />
        <div class="game-result">
          <div v-if="gameStateStore.gameOver">
            <q-btn color="orange" @click="resetGame" class="q-mb-md">
              Play Again
            </q-btn>
          </div>
          <BounceInAnimation>
            <h4
              v-if="gameStateStore.gameOver && gameStateStore.youWin"
              class="q-my-md"
              style="color: green"
            >
              You Win!
            </h4>
          </BounceInAnimation>
          <div v-if="gameStateStore.gameOver">
            <h4 v-if="gameStateStore.isPush" style="color: orange">Push</h4>
            <h4 v-else-if="!gameStateStore.youWin" style="color: red">
              You Lose
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.Blackjack {
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  height: 100dvh;
  max-width: 60%;
  text-align: center;
}

/* .Dealer-Wrapper {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, +30%);
}

.Hand-Wrapper {
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, -80%);
} */

.Dealer-Cards,
.Hand-Cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}

.buttons-wrapper {
  max-width: 500px;
  margin: auto;
  position: relative;
}

.game-result {
  position: absolute;
  right: 50%;
  transform: translate(50%, 0);
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
