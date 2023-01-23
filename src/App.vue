<script setup lang="ts">
import BackgroundTable from "./components/BackgroundTable.vue";
import MainGame from "./components/MainGame.vue";
</script>

<template>
  <main>
    <div class="window-height relative-position row items-start justify-center">
      <BackgroundTable />
      <MainGame class="game" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.game {
  // position: absolute;
  // top: 10%;
}
</style>
