<template>
  <div :class="themeType">
    <div class="min-h-screen bg-gray-100 dark:bg-gray-800">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import useThemeTypeStore from 'src/stores/theme';

const themeStore = useThemeTypeStore();
const { themeType } = storeToRefs(themeStore);
</script>
