// src/router.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import FeaturedPlaylists from './components/FeaturedPlaylists.vue'
import SongSearch from './components/SongSearch.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/featured', component: FeaturedPlaylists },
  {path: '/',component: SongSearch}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
