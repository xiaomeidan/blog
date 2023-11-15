<template>
  <button class="fixed top-8 right-8" @click="toggleFireworkPlay">
    <MusicalNoteIcon
      :class="['w-6 h-6 text-sky-300', { 'animate-spin': isFireworkPlay }]"
      aria-hidden="true"
    ></MusicalNoteIcon>
  </button>
  <button class="fixed top-20 right-8" @click="toggleCakePlay">
    <CakeIcon
      :class="['w-6 h-6 text-yellow-300', { 'animate-spin': isCakePlay }]"
      aria-hidden="true"
    ></CakeIcon>
  </button>

  <RouterView />
  <audio :src="fireworkSound" :id="fireworkId" loop></audio>
  <audio :src="cakeSound" :id="cakeId" loop></audio>
</template>

<script setup lang="ts" name="ViewBirthday">
import { MusicalNoteIcon, CakeIcon } from '@heroicons/vue/24/outline';
import fireworkSound from 'src/assets/birthday/firework.mp3';
import cakeSound from 'src/assets/birthday/happy.mp3';

const fireworkId = 'fireworkAudio';
const cakeId = 'cakeAudio';
const isFireworkPlay = ref(false);
const isCakePlay = ref(false);

function toggleFireworkPlay() {
  const audio: HTMLElement | null = document.getElementById(fireworkId);
  if (audio) {
    isFireworkPlay.value = !isFireworkPlay.value;
    return isFireworkPlay.value
      ? (audio as HTMLAudioElement).play()
      : (audio as HTMLAudioElement).pause();
  }
}

function toggleCakePlay() {
  const audio: HTMLElement | null = document.getElementById(cakeId);
  if (audio) {
    isCakePlay.value = !isCakePlay.value;
    return isCakePlay.value
      ? (audio as HTMLAudioElement).play()
      : (audio as HTMLAudioElement).pause();
  }
}
</script>

<style scoped>
.animate-spin {
  animation: spin 3s linear infinite;
}
</style>
