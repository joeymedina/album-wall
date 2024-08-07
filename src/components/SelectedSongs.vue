<template>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="song in selectedSongs" :key="song.id" class="border p-4 rounded shadow">
        <img :src="song.artworkUrl" alt="Artwork" class="w-90 h-90 object-cover mb-2">
        <p class="font-semibold">{{ song.name }}</p>
        <p class="text-sm text-gray-500">{{ song.artist }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  
  interface Song {
    id: string;
    name: string;
    artist: string;
    artworkUrl: string;
  }
  
  export default defineComponent({
    name: 'SelectedSongs',
    props: {
      selectedSongs: {
        type: Array as PropType<Song[]>,
        required: true,
      },
    },
  });
  </script>
  