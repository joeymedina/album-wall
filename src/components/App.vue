<template>
    <div class="app-container">
      <div class="search-bar-container">
        <AlbumSearch @album-select="addAlbum" />
      </div>
      <div class="selected-albums-container">
        <SelectedAlbums :selected-albums="selectedAlbums" @update:selected-albums="updateSelectedAlbums" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import AlbumSearch from './AlbumSearch.vue';
  import SelectedAlbums from './SelectedAlbums.vue';
  
  interface Song {
    id: string;
    name: string;
    artist: string;
    artworkUrl: string;
  }
  
  interface Album {
    id: string;
    name: string;
    artist: string;
    artworkUrl: string;
    sequence: number;
  }

  export default defineComponent({
    name: 'App',
    components: {
      AlbumSearch,
      SelectedAlbums,
    },
    
    setup() {

          // Load saved albums from localStorage on mount
    onMounted(() => {
      const savedAlbums = localStorage.getItem('selectedAlbums');
      if (savedAlbums) {
        selectedAlbums.value = JSON.parse(savedAlbums);
      }
    });
    
      const selectedAlbums = ref<Album[]>([]);
  
      const addAlbum = (album: Album) => {
        if (!selectedAlbums.value.some(s => s.id === album.id)) {
          selectedAlbums.value.push(album);
          saveAlbums();
        }
      };
  
      const updateSelectedAlbums = (albums: Album[]) => {
        selectedAlbums.value = albums;
        saveAlbums();
    };

    const saveAlbums = () => {
      localStorage.setItem('selectedAlbums', JSON.stringify(selectedAlbums.value));
    };

      return { selectedAlbums, addAlbum, updateSelectedAlbums };
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
  
  .selected-albums-container {
    margin-top: 80px; /* Adjust the margin as needed to ensure space between search bar and album cards */
    width: 100%;
    max-width: 600px;
  }
  </style>
  