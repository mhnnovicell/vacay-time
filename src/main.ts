import { createApp, defineAsyncComponent } from 'vue';
import './main.css';
import { StoryblokVue, apiPlugin } from '@storyblok/vue';
import Particles from 'vue3-particles';

import App from './App.vue';

const app = createApp(App);

app.use(StoryblokVue, {
  accessToken: '7ul6j6ZEzULsSzaoasa2HAtt',
  bridge: process.env.NODE_ENV !== 'production' ? true : false, // optimizes by excluding the bridge on production
  use: [apiPlugin],
});

app.use(Particles);

app.component(
  'Page',
  defineAsyncComponent(() => import('./components/Page.vue'))
);

app.component(
  'Countdown',
  defineAsyncComponent(() => import('./components/Countdown.vue'))
);

app.mount('#app');
