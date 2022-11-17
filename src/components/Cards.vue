<script setup lang="ts">
import { ref } from "vue";
import Heart2 from "../assets/Blackjack-Karten/Herz-Karten/2-Herz-Karte.svg";
import Heart3 from "../assets/Blackjack-Karten/Herz-Karten/3-Herz-Karte.svg";
import Heart4 from "../assets/Blackjack-Karten/Herz-Karten/4-Herz-Karte.svg";
import Heart5 from "../assets/Blackjack-Karten/Herz-Karten/5-Herz-Karte.svg";
import Heart6 from "../assets/Blackjack-Karten/Herz-Karten/6-Herz-Karte.svg";
import Heart7 from "../assets/Blackjack-Karten/Herz-Karten/7-Herz-Karte.svg";
import Heart8 from "../assets/Blackjack-Karten/Herz-Karten/8-Herz-Karte.svg";
import Heart9 from "../assets/Blackjack-Karten/Herz-Karten/9-Herz-Karte.svg";
import Heart10 from "../assets/Blackjack-Karten/Herz-Karten/10-Herz-Karte.svg";
import HeartJack from "../assets/Blackjack-Karten/Herz-Karten/Jack-Herz-Karte.svg";
import HeartQueen from "../assets/Blackjack-Karten/Herz-Karten/Queen-Herz-Karte.svg";
import HeartKing from "../assets/Blackjack-Karten/Herz-Karten/King-Herz-Karte.svg";
import HeartAce from "../assets/Blackjack-Karten/Herz-Karten/Ass-Herz-Karte.svg";

import Diamond2 from "../assets/Blackjack-Karten/Karo-Karten/2-Karo-Karte.svg";
import Diamond3 from "../assets/Blackjack-Karten/Karo-Karten/3-Karo-Karte.svg";
import Diamond4 from "../assets/Blackjack-Karten/Karo-Karten/4-Karo-Karte.svg";
import Diamond5 from "../assets/Blackjack-Karten/Karo-Karten/5-Karo-Karte.svg";
import Diamond6 from "../assets/Blackjack-Karten/Karo-Karten/6-Karo-Karte.svg";
import Diamond7 from "../assets/Blackjack-Karten/Karo-Karten/7-Karo-Karte.svg";
import Diamond8 from "../assets/Blackjack-Karten/Karo-Karten/8-Karo-Karte.svg";
import Diamond9 from "../assets/Blackjack-Karten/Karo-Karten/9-Karo-Karte.svg";
import Diamond10 from "../assets/Blackjack-Karten/Karo-Karten/10-Karo-Karte.svg";
import DiamondJack from "../assets/Blackjack-Karten/Karo-Karten/Jack-Karo-Karte.svg";
import DiamondQueen from "../assets/Blackjack-Karten/Karo-Karten/Queen-Karo-Karte.svg";
import DiamondKing from "../assets/Blackjack-Karten/Karo-Karten/King-Karo-Karte.svg";
import DiamondAce from "../assets/Blackjack-Karten/Karo-Karten/Ass-Karo-Karte.svg";

import Spade2 from "../assets/Blackjack-Karten/Pik-Karten/2-Pik-Karte.svg";
import Spade3 from "../assets/Blackjack-Karten/Pik-Karten/3-Pik-Karte.svg";
import Spade4 from "../assets/Blackjack-Karten/Pik-Karten/4-Pik-Karte.svg";
import Spade5 from "../assets/Blackjack-Karten/Pik-Karten/5-Pik-Karte.svg";
import Spade6 from "../assets/Blackjack-Karten/Pik-Karten/6-Pik-Karte.svg";
import Spade7 from "../assets/Blackjack-Karten/Pik-Karten/7-Pik-Karte.svg";
import Spade8 from "../assets/Blackjack-Karten/Pik-Karten/8-Pik-Karte.svg";
import Spade9 from "../assets/Blackjack-Karten/Pik-Karten/9-Pik-Karte.svg";
import Spade10 from "../assets/Blackjack-Karten/Pik-Karten/10-Pik-Karte.svg";
import SpadeJack from "../assets/Blackjack-Karten/Pik-Karten/Jack-Pik-Karte.svg";
import SpadeQueen from "../assets/Blackjack-Karten/Pik-Karten/Queen-Pik-Karte.svg";
import SpadeKing from "../assets/Blackjack-Karten/Pik-Karten/King-Pik-Karte.svg";
import SpadeAce from "../assets/Blackjack-Karten/Pik-Karten/Ass-Pik-Karte.svg";

import Club2 from "../assets/Blackjack-Karten/Kreuz-Karten/2-Kreuz-Karte.svg";
import Club3 from "../assets/Blackjack-Karten/Kreuz-Karten/3-Kreuz-Karte.svg";
import Club4 from "../assets/Blackjack-Karten/Kreuz-Karten/4-Kreuz-Karte.svg";
import Club5 from "../assets/Blackjack-Karten/Kreuz-Karten/5-Kreuz-Karte.svg";
import Club6 from "../assets/Blackjack-Karten/Kreuz-Karten/6-Kreuz-Karte.svg";
import Club7 from "../assets/Blackjack-Karten/Kreuz-Karten/7-Kreuz-Karte.svg";
import Club8 from "../assets/Blackjack-Karten/Kreuz-Karten/8-Kreuz-Karte.svg";
import Club9 from "../assets/Blackjack-Karten/Kreuz-Karten/9-Kreuz-Karte.svg";
import Club10 from "../assets/Blackjack-Karten/Kreuz-Karten/10-Kreuz-Karte.svg";
import ClubJack from "../assets/Blackjack-Karten/Kreuz-Karten/Jack-Kreuz-Karte.svg";
import ClubQueen from "../assets/Blackjack-Karten/Kreuz-Karten/Queen-Kreuz-Karte.svg";
import ClubKing from "../assets/Blackjack-Karten/Kreuz-Karten/King-Kreuz-Karte.svg";
import ClubAce from "../assets/Blackjack-Karten/Kreuz-Karten/Ass-Kreuz-Karte.svg";

const CARDS = ref([
  Heart2,
  Heart3,
  Heart4,
  Heart5,
  Heart6,
  Heart7,
  Heart8,
  Heart9,
  Heart10,
  HeartJack,
  HeartQueen,
  HeartKing,
  HeartAce,

  Diamond2,
  Diamond3,
  Diamond4,
  Diamond5,
  Diamond6,
  Diamond7,
  Diamond8,
  Diamond9,
  Diamond10,
  DiamondJack,
  DiamondQueen,
  DiamondKing,
  DiamondAce,

  Spade2,
  Spade3,
  Spade4,
  Spade5,
  Spade6,
  Spade7,
  Spade8,
  Spade9,
  Spade10,
  SpadeJack,
  SpadeQueen,
  SpadeKing,
  SpadeAce,

  Club2,
  Club3,
  Club4,
  Club5,
  Club6,
  Club7,
  Club8,
  Club9,
  Club10,
  ClubJack,
  ClubQueen,
  ClubKing,
  ClubAce,
]);
</script>

<template>
  <div class="Cards">
    <div class="Card" v-for="(card, index) in CARDS" :key="card">
      <div v-if="index % 13 == 0">new set</div>
      <img :src="card" alt="card" width="100" />
    </div>
  </div>
</template>

<style></style>
