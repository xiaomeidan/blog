import type { NuxtConfig } from "nuxt/schema";

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
  srcDir: "src/",
  devtools: { enabled: true },
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
}) as NuxtConfig;
