// src/router.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import FeaturedPlaylists from './components/FeaturedPlaylists.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: FeaturedPlaylists }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
