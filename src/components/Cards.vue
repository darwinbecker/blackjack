<script setup lang="ts">
import type { Hand } from "@/models/Hand";
import { nextTick, onMounted, ref, watch, type Ref } from "vue";
import {
  CARDS_FULL,
  determineBestHandValue,
  parseCardValue,
} from "../config/Config";
import type { Card } from "../models/Card";
import CardAnimation from "./CardAnimation.vue";
import CardItem from "./CardItem.vue";

const randomIndex: Ref<number> = ref(
  Math.floor(Math.random() * CARDS_FULL.length)
);

const getRandomCard = (): Card => {
  randomIndex.value = Math.floor(Math.random() * CARDS_FULL.length);
  return CARDS_FULL[randomIndex.value] as Card;
};

const getLowCard = (): Card => {
  // return CARDS_FULL[3] as Card;
  return CARDS_FULL[0] as Card;
};

const hand: Ref<Card[]> = ref([getRandomCard(), getRandomCard()]);
const handNumbers: Ref<number[]> = ref(
  hand.value.map((card) => parseCardValue(card.value))
);

const handValue: Ref<number> = ref(determineBestHandValue(handNumbers.value));

const isBust: Ref<boolean> = ref(false);
const isPush: Ref<boolean> = ref(false);
const youWin: Ref<boolean> = ref(false);
const gameOver: Ref<boolean> = ref(false);

const isDealersTurn: Ref<boolean> = ref(false);
const dealerHand: Ref<Card[]> = ref([getLowCard(), getLowCard()]);
const dealerHandNumbers: Ref<number[]> = ref(
  dealerHand.value.map((card) => parseCardValue(card.value))
);
const dealerHandValue: Ref<number> = ref(
  determineBestHandValue([dealerHandNumbers.value[0]])
);

onMounted(() => {
  console.log(dealerHandNumbers.value);
  // hand.value.push(getRandomCard());
  // dealerHand.value.push(CardBacksite);
  console.log(hand.value[0].name);
  console.log(dealerHand.value[0].name);
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
      youWin.value = true;
      gameOver.value = true;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  [dealerHand, isDealersTurn],
  async ([newDealerHand, newIsDealersTurn]) => {
    // dealerHandNumbers.value = [parseCardValue(newDealerHand[0].value)];
    dealerHandValue.value = parseCardValue(newDealerHand[0].value); // only show & calculate first card (max. value = 11 for Ace)

    if (!newIsDealersTurn) return;
    dealerHandNumbers.value = newDealerHand.map((card) =>
      parseCardValue(card.value)
    );
    dealerHandValue.value = determineBestHandValue(dealerHandNumbers.value);

    if (dealerHandValue.value < 17) {
      // draw card every 1.5s until dealer has 17 or more
      setTimeout(async () => {
        dealerHand.value.push(getLowCard());
        console.log("get new card ");
        // reveal card after
        // setTimeout(async () => {
        await nextTick().then(() => {
          revealCards();
        });
        // }, 250);
      }, 1500);
      return;
    }

    // revealCards();
    // await nextTick().then(() => revealCards());

    if (dealerHandValue.value > 21 || dealerHandValue.value < handValue.value) {
      youWin.value = true;
      gameOver.value = true;
    } else if (dealerHandValue.value > handValue.value) {
      youWin.value = false;
      gameOver.value = true;
    } else {
      // push
      console.log("PUSH");
      console.log("dealerHandValue", dealerHandValue.value);
      console.log("handValue", handValue.value);
      isPush.value = true;
      gameOver.value = true;
    }
  },
  {
    deep: true,
  }
);

const resetGame = async () => {
  isDealersTurn.value = false;
  isBust.value = false;
  isPush.value = false;
  youWin.value = false;
  gameOver.value = false;
  hand.value = [getRandomCard(), getRandomCard()];
  dealerHand.value = [getLowCard(), getLowCard()];
};

const revealCards = () => {
  // flip cards
  const hiddenCards = document.getElementsByClassName("HiddenCard");
  // console.log(hiddenCards);
  // console.log("length", hiddenCards.length);

  for (let i = 0; i < hiddenCards.length; i++) {
    setTimeout(() => {
      // console.log(hiddenCards[i]);
      const hiddenCardInner = hiddenCards[i].firstChild! as HTMLDivElement;
      hiddenCardInner.classList.add("is-flipped");
    }, 500);
  }
};
</script>

<template>
  <div class="Blackjack">
    <div class="Dealer">
      <div
        class="Card"
        v-for="(card, index) in dealerHand"
        :key="card.id + '-' + index"
      >
        <CardItem
          class="HiddenCard"
          v-if="index > 0"
          :card="card"
          :isRevealed="false"
        ></CardItem>
        <CardItem v-else :card="card" :isRevealed="true"></CardItem>
      </div>
    </div>
    <div>Value: {{ dealerHandValue }}</div>

    <div class="Hand">
      <div
        class="Card"
        v-for="(card, index) in hand"
        :key="card.id + '-' + index"
      >
        <CardItem :card="card" :isRevealed="true"></CardItem>
        <!-- <img :src="card.image" alt="card" width="100" /> -->
      </div>
    </div>
    <div>Value: {{ handValue }}</div>

    <div class="Button-List">
      <!-- Bet -->
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
        Bet
      </v-btn>
      <!-- Hit -->
      <v-btn
        class="mx-2"
        color="green"
        elevation="4"
        x-large
        @click="hand.push(getRandomCard())"
        :disabled="gameOver || handValue >= 21"
      >
        Hit
      </v-btn>
      <!-- Stand -->
      <v-btn
        class="mx-2"
        color="red"
        elevation="4"
        x-large
        @click="isDealersTurn = true"
        :disabled="gameOver || handValue >= 21"
      >
        Stand
      </v-btn>
    </div>

    <CardAnimation>
      <div v-if="gameOver && youWin">You Win!</div>
    </CardAnimation>

    <div v-if="gameOver">
      <div v-if="youWin"></div>
      <div v-else-if="isPush">PUSH</div>
      <div v-else>You Lose.</div>

      <v-btn color="orange" elevation="4" x-large @click="resetGame">
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
