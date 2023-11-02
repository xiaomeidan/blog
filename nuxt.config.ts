// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  title: "Amy Site",
  devtools: { enabled: true },
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
});

