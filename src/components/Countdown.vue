<template>
  <section v-editable="blok" class="w-full h-full flex flex-col">
    <h1
      class="w-full text-center flex justify-center self-center items-center mt-16 align-middle text-7xl italic text-white headline"
    >
      {{ headlineText }}
    </h1>
    <div
      v-if="!showCountdown"
      class="flex w-full h-1/2 justify-center self-center items-center text-center mt-16 p-4 md:p-0 countdown-container"
    >
      <div class="m-4 text-white" v-if="days >= 1">
        <span class="text-4xl">{{ days }}</span>
        <p class="text-xl font-bold">{{ days === 1 ? 'Day' : 'Days' }}</p>
      </div>

      <div class="m-4 text-4xl text-white" v-if="hours >= 1">
        <span class="text-4xl">{{ hours }}</span>
        <p class="text-xl font-bold">
          {{ hours === 1 ? 'Hour' : 'Hours' }}
        </p>
      </div>

      <div class="m-4 text-4xl text-white" v-if="minutes >= 1">
        <span class="text-4xl">{{ minutes }}</span>
        <p class="text-xl font-bold">
          {{ minutes === 1 ? 'Minute' : 'Minutes' }}
        </p>
      </div>

      <div class="m-4 text-4xl text-white">
        <span class="text-4xl">{{ seconds }}</span>
        <p class="text-xl font-bold">
          {{ seconds === 1 ? 'Second' : 'Seconds' }}
        </p>
      </div>
    </div>

    <div
      v-else
      class="flex w-full h-full justify-center self-center items-center text-center"
    >
      <h2
        class="countdown-container font-bold text-white blink_me uppercase text-6xl"
      >
        {{ blok?.birthdayText }}
      </h2>
      <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="options"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { computed } from '@vue/reactivity';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

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

const headlineText = ref('');

const setHeadlineText = () => {
  if (showCountdown) {
    headlineText.value = 'Vacay Time';
  } else {
    headlineText.value = 'Vacay Time';
  }
};

onMounted(() => {
  setHeadlineText();
  startTimer();
});

const showCountdown = computed(() => {
  return hasEndedBool.value;
});

const particlesLoaded = async (container: any) => {
  console.log('Particles container loaded', container);
};

const options = {
  background: {
    color: {
      value: 'white',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'repulse',
      },
      onHover: {
        enable: false,
        mode: 'grab',
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
        speed: 3,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#0e47a1',
    },
    links: {
      color: '#0e47a1',
      distance: 150,
      enable: false,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 20,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      character: [
        {
          fill: false,
          font: 'Font Awesome 5 Free',
          style: '',
          value: ['\uf06b'],
          weight: '900',
        },
      ],
      polygon: {
        sides: 5,
      },
      stroke: {
        color: '#ffffff',
        width: 0.5,
      },
      type: 'char',
    },
    size: {
      animation: {
        enable: false,
        minimumValue: 10,
        speed: 10,
        sync: false,
      },
      random: false,
      value: 16,
    },
  },
  detectRetina: true,
};
const particlesInit = async (engine: Engine) => {
  await loadFull(engine);
};
</script>

<style scoped>
.headline {
  font-family: 'Cookie', cursive;
}

.countdown-container {
  font-family: 'Poppins', sans-serif;
}

.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
