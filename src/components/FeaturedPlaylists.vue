<template>
    <div>
      <h1>Featured Playlists</h1>
      <ul>
        <li v-for="playlist in playlists" :key="playlist.id">
          <img :src="playlist.images[0].url" :alt="playlist.name" />
          <p>{{ playlist.name }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import spotifyService from '../services/spotifyServices';
  
  interface Playlist {
    id: string;
    name: string;
    images: { url: string }[];
  }
  
  export default defineComponent({
    setup() {
      const playlists = ref<Playlist[]>([]);
  
      onMounted(async () => {
        playlists.value = await spotifyService.getFeaturedPlaylists();
      });
  
      return { playlists };
    }
  });
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  </style>
  