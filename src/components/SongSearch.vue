<template>
  <div class="relative w-full flex flex-col items-center">
    <input
      type="text"
      v-model="query"
      @input="search"
      @focus="showResults"
      placeholder="Search for a song..."
      class="rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-indigo-500"
      style="width: 100%; max-width: 600px;"
    />
    <ul
      v-if="searchResultsVisible && searchResults.length"
      class="absolute top-12 left-0 right-0 bg-white border border-gray-300 max-h-96 overflow-y-auto rounded shadow-md"
      style="width: 100%; max-width: 600px;"
    >
      <li
        v-for="song in searchResults"
        :key="song.id"
        class="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
        @click="selectSong(song)"
      >
        <img :src="song.artworkUrl" alt="Artwork" class="w-10 h-10 mr-4">
        <div>
          <p class="font-semibold">{{ song.name }}</p>
          <p class="text-sm text-gray-500">{{ song.artist }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType, watch } from 'vue';
import spotifyService from '../services/spotifyServices';

interface Song {
  id: string;
  name: string;
  artist: string;
  artworkUrl: string;
}

export default defineComponent({
  name: 'SongSearch',
  setup(_, { emit }) {
    const query = ref('');
    const searchResults = ref<Song[]>([]);
    const searchResultsVisible = ref(false);

    const search = async () => {
      try {
        searchResults.value = await spotifyService.searchSongs(query.value);
        searchResultsVisible.value = query.value.length > 0;
      } catch (error) {
        console.error('Error searching for songs:', error);
      }
    };

    const closeResults = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.relative')) {
        searchResultsVisible.value = false;
      }
    };

    const showResults = () => {
      if (query.value && searchResults.value.length) {
        searchResultsVisible.value = true;
      }
    };

    const selectSong = (song: Song) => {
      emit('song-select', song);
      searchResultsVisible.value = false;
    };

    return { query, searchResults, searchResultsVisible, search, closeResults, showResults, selectSong };
  },
});
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
