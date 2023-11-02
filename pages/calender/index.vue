<template>
  <div class="box">
    <h1>{{ year }} 年 {{ month + 1 }} 月 {{ day }} 日</h1>
    <h1>星期{{ weekMap[week].ch }}</h1>
    <h1>{{ weekMap[week].en }}</h1>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const weekMap = {
  0: { ch: "一", en: "Monday" },
  1: { ch: "二", en: "Tuesday" },
  2: { ch: "三", en: "Wednesday" },
  3: { ch: "四", en: "Thursday" },
  4: { ch: "五", en: "Friday" },
  5: { ch: "六", en: "Saturday" },
  6: { ch: "七", en: "Sunday" },
};

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const week = date.getDay();
</script>

<style scoped>
.box {
  display: flex;
  text-align: center;
  flex-direction: column;
}
</style>
