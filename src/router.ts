// src/router.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import FeaturedPlaylists from './components/FeaturedPlaylists.vue'
import App from './components/App.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/featured', component: FeaturedPlaylists },
  {path: '/',component: App}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
