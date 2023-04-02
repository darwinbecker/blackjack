<script setup lang="ts">
import type { Card } from "@/models/Card";
import { CardBacksite } from "../data/Cards";

interface CardProps {
  card: Card;
  isDealer: boolean;
}
const props = defineProps<CardProps>();
</script>

<template>
  <div class="flip-card">
    <div
      :class="
        props.isDealer
          ? 'Dealercard flip-card-inner'
          : 'Playercard flip-card-inner'
      "
    >
      <div class="flip-card-front">
        <img :src="CardBacksite.image" :alt="CardBacksite.name" width="100" />
      </div>
      <div class="flip-card-back">
        <img :src="props.card.image" :alt="props.card.name" width="100" />
      </div>
    </div>
  </div>
</template>

<style>
.flip-card {
  background-color: transparent;
  width: 100px;
  height: 140px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
.is-flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
</style>
