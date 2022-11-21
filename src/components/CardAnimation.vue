<script setup lang="ts">
// JavaScript hooks logic...
</script>

<template>
  <!-- wrap the built-in Transition component -->
  <!-- @enter="onEnter" @leave="onLeave" -->
  <transition name="card-animation">
    <slot></slot>
    <!-- pass down slot content -->
  </transition>
</template>

<style>
/*
  Necessary CSS...
  Note: avoid using <style scoped> here since it
  does not apply to slot content.
*/
.card-animation-enter-active {
  animation: bounce-in 0.5s;
}

.card-animation-leave-active {
  animation: bounce-in 0.25s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
