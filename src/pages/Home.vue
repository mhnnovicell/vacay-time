<template>
  <StoryblokComponent
    v-if="story"
    :blok="story.content"
    class="w-full h-full"
  />
</template>

<script setup lang="ts">
import { useStoryblok } from '@storyblok/vue';
const story = await useStoryblok('home', { version: 'draft' });
</script>
