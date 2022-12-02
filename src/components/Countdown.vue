<template>
  <section
    v-editable="blok"
    class="flex w-full h-full justify-center self-center items-center text-center"
  >
    <div
      v-if="!showCountdown"
      class="flex w-full h-full justify-center self-center items-center text-center"
    >
      <div class="m-4" v-if="days >= 1">
        {{ days }}
        <p>Days</p>
      </div>

      <div class="m-4" v-if="hours > 1">
        {{ hours }}
        <p>Hours</p>
      </div>

      <div class="m-4" v-if="minutes > 1">
        {{ minutes }}
        <p>Minutes</p>
      </div>

      <div class="m-4">
        {{ seconds }}
        <p>Seconds</p>
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
