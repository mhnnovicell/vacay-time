<template>
  <section v-editable="blok" class="w-full h-full flex flex-col">
    <h1
      class="w-full text-center flex justify-center self-center items-center mt-16 align-middle text-7xl italic text-white headline"
    >
      Vacay Time
    </h1>
    <div
      v-if="!showCountdown"
      class="flex w-full h-1/2 justify-center self-center items-center text-center mt-16"
    >
      <div class="m-4 text-white" v-if="days >= 1">
        <span class="text-4xl">{{ days }}</span>
        <p class="text-xl font-bold">Days</p>
      </div>

      <div class="m-4 text-4xl text-white" v-if="hours > 1">
        <span class="text-4xl">{{ hours }}</span>
        <p class="text-xl font-bold">Hours</p>
      </div>

      <div class="m-4 text-4xl text-white" v-if="minutes > 1">
        <span class="text-4xl">{{ minutes }}</span>
        <p class="text-xl font-bold">Minutes</p>
      </div>

      <div class="m-4 text-4xl text-white">
        <span class="text-4xl">{{ seconds }}</span>
        <p class="text-xl font-bold">Seconds</p>
      </div>
    </div>

    <div
      v-else
      class="flex w-full h-full justify-center self-center items-center text-center"
    >
      <p>hello world</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { computed } from '@vue/reactivity';

const props = defineProps({ blok: Object });

console.log(typeof props.blok?.endDate, 'props');

const now = ref(new Date().getTime());

const seconds = ref(0);
const minutes = ref(0);
const hours = ref(0);
const days = ref(0);

const countDownDate = new Date(props.blok?.birthdayStartDate).getTime();

const hasEnded = countDownDate - now.value;

const hasEndedBool = ref(false);

const birthdayDate = ref(props.blok?.birthdayStartDate);
const christmasDate = ref(props.blok?.christmasStartDate);
const newYearsDate = ref(props.blok?.newYearsStartDate);
const summerVacationDate = ref(props.blok?.summerVacationStartDate);

console.log(
  new Date(birthdayDate.value).getTime() - now.value,
  'birthdayDate.value < now.value'
);
console.log(new Date(birthdayDate.value).getTime(), 'birthdayDate.value');
console.log(now.value, 'now.value');

const getTimeRemaining = () => {
  const total =
    Date.parse(props.blok?.birthdayStartDate.toString()) -
    Date.parse(new Date().toString());
  seconds.value = Math.floor((total / 1000) % 60);
  minutes.value = Math.floor((total / 1000 / 60) % 60);
  hours.value = Math.floor((total / (1000 * 60 * 60)) % 24);
  days.value = Math.floor(total / (1000 * 60 * 60 * 24));

  if (hasEnded < 0) {
    hasEndedBool.value = true;
  } else {
    hasEndedBool.value = false;
  }
};

const startTimer = () => {
  getTimeRemaining();

  setInterval(() => {
    getTimeRemaining();
  }, 1000);
};

onMounted(() => {
  startTimer();
});

const showCountdown = computed(() => {
  return hasEndedBool.value;
});
</script>

<style>
.headline {
  font-family: 'Cookie', cursive;
}
</style>
