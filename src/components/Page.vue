<template>
  <div v-editable="blok" class="w-full h-full">
    <StoryblokComponent
      v-for="blokbody in blok?.body"
      :blok="blokbody"
      :key="blokbody._uid"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({ blok: Object });
</script>
