<template>
  <div class="box">
    <h1 class="mt60">
      <span class="big">{{ year }}</span> 年 <span class="big">{{ month + 1 }}</span> 月
      <span class="big">{{ day }}</span> 日
    </h1>
    <h1>
      <span class="big">{{ weekMap[week].en }}</span> - 星期{{ weekMap[week].ch }}
    </h1>
    <div>
      <img class="img" :src="img" alt="Do you believe in light?" />
    </div>
  </div>
</template>

<script setup lang="ts">
import img from "./automan.jpeg";
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
h1 {
  font-size: 48px;
}
.mt60 {
  margin-top: 160px;
}
.big {
  font-size: 96px;
}
.img {
  width: 400px;
  object-fit: cover;
}
</style>
