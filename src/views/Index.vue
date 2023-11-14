<template>
  <div :class="themeType">
    <Disclosure as="nav" class="bg-gray-100 dark:bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <DisclosureButton
              :class="[
                `relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset`,
                tabColor,
                tabDarkColor
              ]"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div
            class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex flex-shrink-0 items-center">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-white'
                      : 'text-gray-900 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</a
                >
              </div>
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <button
              type="button"
              class="relative rounded-full bg-gray-200 dark:bg-gray-800 p-1 text-gray-900 dark:text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              @click="toggleTheme"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">Toggle theme</span>
              <component :is="themIcon" class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium'
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
      </DisclosurePanel>
    </Disclosure>

    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import useThemeTypeStore from 'src/stores/theme';

const themeStore = useThemeTypeStore();
const { themeType } = storeToRefs(themeStore);

const isDarkTheme = computed(() => themeType.value === 'dark');
const themIcon = computed(() => (isDarkTheme.value ? MoonIcon : SunIcon));

const tabColor =
  'text-gray-800 hover:bg-gray-200 hover:text-gray-800 focus:ring-black';
const tabDarkColor =
  'dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-white';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Language', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false }
];

function toggleTheme() {
  themeStore.changeThemeType(isDarkTheme.value ? 'light' : 'dark');
}
</script>
