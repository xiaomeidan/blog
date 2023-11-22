<template>
  <span :class="['icon', `icon-${icon}`]">
    <span v-for="n of pathLen" :key="n" :class="`path${n}`" />
  </span>
</template>

<script setup lang="ts" name="ComIconIcomoon">
const iconLenMap: Record<string, number> = {
  'zodiac-dog': 2,
  'zodiac-dragon': 2,
  'zodiac-goat': 2,
  'zodiac-horse': 4,
  'zodiac-monkey': 3,
  'zodiac-ox': 4,
  'zodiac-pig': 2,
  'zodiac-rabbit': 2,
  'zodiac-rat': 3,
  'zodiac-rooster': 3,
  'zodiac-snake': 3,
  'zodiac-tiger': 3
};

const props = defineProps<{
  icon: string;
}>();

const pathLen = computed(() => iconLenMap[props.icon] || 0);
</script>
