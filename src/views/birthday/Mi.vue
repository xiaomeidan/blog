<template>
  <div class="bg-black">
    <img :src="imgSrc" class="img" />
    <h1>Happy 6th Birthday<br />游 梓 坚</h1>
    <canvas id="birthday"></canvas>
  </div>
</template>

<script lang="ts" setup name="ViewsBirthday">
import imgSrc from 'src/assets/birthday/mi.png';
import { setCanvas, birthday } from 'src/views/birthday';
const screenHeight = ref(0);

onMounted(init);

// helper functions
const timestamp = () => new Date().getTime();

function init() {
  screenHeight.value = window.innerHeight;
  setCanvas(document.getElementById('birthday'));

  let then = timestamp();

  window.onresize = () => birthday.resize();
  document.onclick = (evt) => birthday.onClick(evt);
  document.ontouchstart = (evt) => birthday.onClick(evt);
  (function loop() {
    requestAnimationFrame(loop);

    let now = timestamp();
    let delta = now - then;

    then = now;
    birthday.update(delta / 1000);
  })();
}
</script>

<style scoped>
canvas {
  display: block;
}
h1 {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-family: 'Source Sans Pro';
  font-size: 5em;
  font-weight: 900;
  -webkit-user-select: none;
  user-select: none;
}
.img {
  position: fixed;
  bottom: 0;
  right: 30px;
  width: 70%;
}
</style>
