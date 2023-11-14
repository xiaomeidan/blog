import { createRouter, createWebHistory } from 'vue-router';
import Home from 'src/views/Index.vue';
import Dashboard from 'src/views/dashboard/Index.vue';
import Birthday from 'src/views/birthday/Index.vue';
import BirthdayMi from 'src/views/birthday/Mi.vue';
import BirthdayYan from 'src/views/birthday/Yan.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      }
    ],
    component: Home
  },
  {
    path: '/birthday',
    name: 'birthday',
    children: [
      {
        path: 'mi',
        name: 'birthdayMi',
        component: BirthdayMi
      },
      {
        path: 'yan',
        name: 'birthdayYan',
        component: BirthdayYan
      }
    ],
    component: Birthday
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
