<template>
  <div id="container"></div>
  <div
    class="min-h-screen text-center grid items-center grid-cols-4 gap-4 text-2xl dark:text-gray-300"
  >
    <div class="text-6xl">{{ city }}</div>
    <div class="">{{ date }}</div>
    <div class="">
      {{ wData?.weather }}<br />
      {{ wData?.temperature }}℃
    </div>
    <div class=""></div>

    <div class="col-span-2">
      风向 {{ wData?.windDirection }}<br />风力{{ wData?.windPower }}级
    </div>
    <div class="col-span-2">湿度 {{ wData?.humidity }}</div>
    <div v-for="(f, index) in forecast" :key="index">
      <p>{{ f.data }} 星期{{ f.week }}</p>
      <p>
        白天 {{ f.dayWeather }} {{ f.dayTemp }}℃, 风向{{ f.windDir
        }}{{ f.dayWindPower }}级
      </p>
      <p>
        夜晚 {{ f.nightWeather }} {{ f.nightTemp }}℃, 风向{{ f.nightWindDir
        }}{{ f.nightWindPower }}级
      </p>
    </div>
  </div>
</template>

<script setup lang="ts" name="ViewCalendar">
import MapLoader from 'src/utils/gdMap';

const city = ref('渝北区');
const wData = ref(null);
const forecast = ref([]);
let AMap: any = null;

const date = computed(() => wData.value?.reportTime.split(' ')[0]);

onMounted(getWeather);

async function getWeather() {
  if (!AMap) {
    AMap = await MapLoader();
  }

  AMap.plugin('AMap.Weather', function () {
    const weather = new AMap.Weather();
    weather.getLive(city.value, function (err, data) {
      if (err) {
        return;
      }
      wData.value = data;
    });

    weather.getForecast(city.value, function (err, data) {
      if (err) {
        return;
      }

      forecast.value = data.forecasts;
    });
  });
}
</script>
