import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useAnimationStateStore = defineStore("animtaionState", () => {
  const animationIsRunning: Ref<boolean> = ref(false);
  const setAnimationIsRunning = (value: boolean) =>
    (animationIsRunning.value = value);

  return {
    animationIsRunning,
    setAnimationIsRunning,
  };
});
