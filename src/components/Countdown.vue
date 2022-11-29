<script setup lang="ts">
import { onMounted, ref } from 'vue';

import holidays from 'date-holidays';

const holidayRef = ref(new holidays('DK'));
const test = holidayRef.value.getHolidays();

onMounted(() => {
  console.log(test, 'test');
});
</script>

<template></template>

<style scoped></style>
