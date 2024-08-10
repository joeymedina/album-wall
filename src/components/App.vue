<template>
    <div class="app-container">
      <div class="search-bar-container">
        <SongSearch @song-select="addSong" />
      </div>
      <div class="selected-songs-container">
        <SelectedSongs :selected-songs="selectedSongs" @update:selected-songs="updateSelectedSongs" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
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

          // Load saved songs from localStorage on mount
    onMounted(() => {
      const savedSongs = localStorage.getItem('selectedSongs');
      if (savedSongs) {
        selectedSongs.value = JSON.parse(savedSongs);
      }
    });
    
      const selectedSongs = ref<Song[]>([]);
  
      const addSong = (song: Song) => {
        if (!selectedSongs.value.some(s => s.id === song.id)) {
          selectedSongs.value.push(song);
          saveSongs();
        }
      };
  
      const updateSelectedSongs = (songs: Song[]) => {
        selectedSongs.value = songs;
        saveSongs();
    };

    const saveSongs = () => {
      localStorage.setItem('selectedSongs', JSON.stringify(selectedSongs.value));
    };

      return { selectedSongs, addSong, updateSelectedSongs };
    },
  });
  </script>
  
  <style scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px; /* Adjust if needed */
    min-height: 100vh;
    position: relative;
  }
  
  .search-bar-container {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    width: 100%;
    max-width: 600px;
  }
  
  .selected-songs-container {
    margin-top: 80px; /* Adjust the margin as needed to ensure space between search bar and song cards */
    width: 100%;
    max-width: 600px;
  }
  </style>
  