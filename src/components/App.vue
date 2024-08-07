<template>
    <div>
      <SongSearch @song-select="addSong" />
      <SelectedSongs :selected-songs="selectedSongs" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import SongSearch from './SongSearch.vue';
  import SelectedSongs from './SelectedSongs.vue';
  
  interface Song {
    id: string;
    name: string;
    artist: string;
    artworkUrl: string;
  }
  
  export default defineComponent({
    name: 'App',
    components: {
      SongSearch,
      SelectedSongs,
    },
    setup() {
      const selectedSongs = ref<Song[]>([]);
  
      const addSong = (song: Song) => {
        if (!selectedSongs.value.some(s => s.id === song.id)) {
          selectedSongs.value.push(song);
        }
      };
  
      return { selectedSongs, addSong };
    },
  });
  </script>
  