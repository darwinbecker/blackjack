<script setup lang="ts">
import type { Card } from "@/models/Card";
import { CardBacksite } from "../config/Config";

interface CardProps {
  card: Card;
  isRevealed: boolean;
}
const props = defineProps<CardProps>();
</script>

<template>
  <div class="flip-card">
    <div class="flip-card-inner" v-if="isRevealed">
      <div class="flip-card-front">
        <img :src="props.card.image" :alt="props.card.name" width="100" />
      </div>
      <div class="flip-card-back">
        <img :src="CardBacksite.image" :alt="CardBacksite.name" width="100" />
      </div>
    </div>
    <div class="flip-card-inner" v-else>
      <div class="flip-card-front">
        <img :src="CardBacksite.image" :alt="props.card.name" width="100" />
      </div>
      <div class="flip-card-back">
        <img :src="props.card.image" :alt="CardBacksite.name" width="100" />
      </div>
    </div>
  </div>
</template>

<style>
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  width: 100px;
  height: 140px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
</style>
