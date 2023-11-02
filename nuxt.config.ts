// https://nuxt.com/docs/api/configuration/nuxt-config
const routerBase =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: "/xiaomeidan.github.io/",
        },
      }
    : {};
export default defineNuxtConfig({
  ...routerBase,
  devtools: { enabled: true },
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
});

