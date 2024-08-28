<template>
  <div class="relative w-full flex flex-col items-center">
    <input
      type="text"
      v-model="query"
      @input="search"
      @focus="showResults"
      placeholder="Search for a album..."
      class="rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-indigo-500"
      style="width: 100%; max-width: 600px;"
    />
    <ul
      v-if="searchResultsVisible && searchResults.length"
      class="absolute top-12 left-0 right-0 bg-white border border-gray-300 max-h-96 overflow-y-auto rounded shadow-md"
      style="width: 100%; max-width: 600px;"
    >
      <li
        v-for="album in searchResults"
        :key="album.id"
        class="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
        @click="selectAlbum(album)"
      >
        <img :src="album.artworkUrl" alt="Artwork" class="w-10 h-10 mr-4">
        <div>
          <p class="font-semibold">{{ album.name }}</p>
          <p class="text-sm text-gray-500">{{ album.artist }}</p>
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

interface Album {
  id: string;
  name: string;
  artist: string;
  artworkUrl: string;
  sequence: number;
}

export default defineComponent({
  name: 'AlbumSearch',
  setup(_, { emit }) {
    const query = ref('');
    const searchResults = ref<Album[]>([]);
    const searchResultsVisible = ref(false);

    const search = async () => {
      try {
        searchResults.value = await spotifyService.searchAlbums(query.value);
        searchResultsVisible.value = query.value.length > 0;
      } catch (error) {
        console.error('Error searching for albums:', error);
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

    const selectAlbum = (album: Album) => {
      emit('album-select', album);
      searchResultsVisible.value = false;
    };

    return { query, searchResults, searchResultsVisible, search, closeResults, showResults, selectAlbum };
  },
});
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
