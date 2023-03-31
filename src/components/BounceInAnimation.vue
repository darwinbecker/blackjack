<template>
  <transition name="bounce-in-animation">
    <slot></slot>
  </transition>
</template>

<style>
.bounce-in-animation-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-in-animation-leave-active {
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
