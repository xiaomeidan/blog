<template>
  <div id="container"></div>
  <div
    class="min-h-screen text-center flex flex-col font-mono text-2xl dark:text-gray-300 border-40 border-black dark:border-gray-300"
  >
    <p class="w-full text-6xl bg-black text-gray-300 pb-10 pl-10 text-left">
      {{ year }}
      <!-- {{ lunarData?.animal }} -->
      {{ lunarData?.term }} {{ lunarData?.lunarFestival }}
      {{ lunarData?.festival }}
    </p>
    <p class="w-full border-y-4 border-black text-3xl p-3">
      {{ `${lunarData?.monthCn}${lunarData?.dayCn}` }}
      {{ `${lunarData?.gzYear}年` }}
      <Icomoon class="text-4xl" :icon="zodiacMap[lunarData?.animal]" />
      {{ `${lunarData?.gzMonth}月 ${lunarData?.gzDay}日` }}
    </p>
    <div class="w-full grid grid-cols-2 text-3xl pt-10">
      <div>
        {{ monthMap[month].en }}<br />
        {{ weekMap[week].en }}<br />
      </div>
      <div>
        {{ monthMap[month].zh }}月<br />
        星期{{ weekMap[week].zh }}<br />
      </div>
    </div>
    <div class="w-full flex-1 text-22xl leading-none">
      {{ date }}
    </div>
    <div class="w-full grid grid-cols-4 items-center pb-4">
      <div class="text-2xl">{{ city }}</div>
      <div class="text-2xl flex">
        <div class="flex-1">
          <Icomoon
            class="text-6xl"
            v-if="wData?.weather"
            :icon="weatherIconMap[wData.weather]"
          />
        </div>
        <div class="flex-3 text-left">
          {{ wData?.weather }}<br />
          {{ wData?.temperature }}℃
        </div>
      </div>
      <div class="text-2xl">
        风向{{ wData?.windDirection }}<br />风力{{ wData?.windPower }}级
      </div>
      <div class="text-2xl">湿度 {{ wData?.humidity }}</div>
    </div>
    <div class="w-full grid grid-cols-3">
      <div
        v-for="(f, index) in forecast"
        :class="['border-y-4  border-black p-4', { 'border-x-4': index === 1 }]"
        :key="index"
      >
        <p>星期{{ weekMap[f.week].zh }}</p>
        <div class="flex">
          <div class="flex-1">
            <Icomoon class="text-5xl" :icon="weatherIconMap[f.dayWeather]" />
          </div>
          <div class="flex-3 text-left">
            <p>{{ fmtWeather(f) }}</p>
            <p>{{ fmtTemp(f) }}</p>
          </div>
        </div>
        <p>风向{{ f.dayWindDir }}{{ f.dayWindPower }}级</p>
      </div>
    </div>
    <p class="w-full text-left text-3xl p-6">
      {{ enList[date][0] }}<br />
      {{ enList[date][1] }}
    </p>
  </div>
</template>

<script setup lang="ts" name="ViewCalendar">
import dayjs from 'dayjs';
import solarLunar from 'solarlunar-es';
import MapLoader from 'src/utils/gdMap';
import { weatherIconMap } from 'src/views/calendar/weather';
import {
  enList,
  monthMap,
  weekMap,
  zodiacMap
} from 'src/views/calendar/calendar';
import Icomoon from 'src/components/icons/Icomoon.vue';

interface Forecast {
  date: string; // "2023-11-24"
  week: 1 | 2 | 3 | 4 | 5 | 6 | 7; // "5"
  dayWeather: string; // "多云"
  nightWeather: string; // "小雨"
  dayTemp: number; // 20
  nightTemp: number; // 12
  dayWindDir: string; // "东"
  nightWindDir: string; // "东"
  dayWindPower: string; // "1-3"
  nightWindPower: string; // "1-3"
}

const day = ref(dayjs());
const adcode = ref('');
const city = ref('');
const wData = ref<object>({});
const forecast = ref<Forecast[]>([]);
let AMap: any = null;

const year = computed(() => day.value.get('year'));
const month = computed(() => day.value.get('month') + 1);
const date = computed(() => day.value.get('date'));
const week = computed(() => {
  const w = day.value.get('day');
  return w === 0 ? 7 : w;
});
const lunarData = computed(() =>
  solarLunar.solar2lunar(year.value, month.value, date.value)
);

onMounted(() => {
  getWeather();
  zeroRefresh();
});

async function getWeather() {
  console.log('get weather ', dayjs());
  if (!AMap) {
    AMap = await MapLoader();
  }

  AMap.plugin(['AMap.CitySearch', 'AMap.Weather'], () => {
    var citySearch = new AMap.CitySearch();
    citySearch.getLocalCity((status, result) => {
      if (status !== 'complete' || result.info !== 'OK') {
        return;
      }
      adcode.value = result.adcode;
      city.value = result.city;
      const weather = new AMap.Weather();
      weather.getLive(adcode.value, (err, data) => {
        if (err) {
          return;
        }
        wData.value = data;
      });

      weather.getForecast(adcode.value, (err, data) => {
        if (err) {
          return;
        }

        forecast.value = data.forecasts;
        forecast.value.shift();
      });
    });
  });
}

function fmtWeather(weather: Forecast) {
  if (weather.dayWeather === weather.nightWeather) {
    return weather.dayWeather;
  }
  return `${weather.dayWeather}转${weather.nightWeather}`;
}

function fmtTemp(weather: Forecast) {
  if (weather.dayTemp === weather.nightTemp) {
    return `${weather.dayTemp}℃`;
  }
  return `${weather.nightTemp} ~ ${weather.dayTemp}℃`;
}

function zeroRefresh() {
  const pastSec = day.value.unix();
  const remainSec =
    day.value.add(1, 'day').hour(0).minute(0).second(0).unix() - pastSec;
  console.log('remain sec', remainSec);
  const timer = setTimeout(() => {
    getWeather();
    setInterval(getWeather, 24 * 60 * 60 * 1000);
    clearTimeout(timer);
  }, remainSec * 1000);
}
</script>
