import { defineStore } from 'pinia';
import { ref } from 'vue';

const useThemeTypeStore = defineStore(
  'themeType',
  () => {
    const themeType = ref('dark');
    const changeThemeType = (newTheme: string) => {
      themeType.value = newTheme;
    };
    return { themeType, changeThemeType };
  },
  {
    // 持久化
    persist: [
      {
        // 存储到sessionStorage
        paths: ['themeType'],
        storage: sessionStorage,
        key: 'themeType'
      }
    ]
  }
);
export default useThemeTypeStore;
