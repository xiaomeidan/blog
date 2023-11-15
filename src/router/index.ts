import { createRouter, createWebHistory } from 'vue-router';
import Home from 'src/views/Index.vue';
import Dashboard from 'src/views/dashboard/Index.vue';
import Calendar from 'src/views/calendar/Index.vue';
import Blog from 'src/views/blog/Index.vue';
import Birthday from 'src/views/birthday/Index.vue';
import BirthdayMi from 'src/views/birthday/Mi.vue';
import BirthdayYan from 'src/views/birthday/Yan.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'dashboard' },
    children: [
      { path: 'dashboard', name: 'dashboard', component: Dashboard },
      { path: 'blog', name: 'blog', component: Blog }
    ],
    component: Home
  },
  {
    path: '/birthday',
    name: 'birthday',
    redirect: { name: 'birthdayMi' },
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
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
