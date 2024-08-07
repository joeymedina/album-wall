<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <input
      type="text"
      v-model="query"
      @input="handleInput"
      @focus="handleFocus"
      placeholder="Search for a song..."
      class="rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-indigo-500"
      style="width: 35rem;"
    >
    <ul v-if="showResults && searchResults.length" class="mt-4 border border-gray-300 w-80 max-h-96 overflow-y-auto rounded shadow-md" style="width: 40rem;" @click.stop>
      <li v-for="song in searchResults" :key="song.id" class="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100" @click="selectSong(song)">
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
import { defineComponent, ref, onMounted, type PropType } from 'vue';
import spotifyService from '../services/spotifyServices';

interface Song {
  id: string;
  name: string;
  artist: string;
  artworkUrl: string;
}

export default defineComponent({
  name: 'SongSearch',
  props: {
    onSongSelect: {
      type: Function as PropType<(song: Song) => void>,
      required: true,
    },
  },
  setup(props) {
    const query = ref('');
    const searchResults = ref<Song[]>([]);
    const showResults = ref(false);

    const search = async () => {
      try {
        searchResults.value = await spotifyService.searchSongs(query.value);
        showResults.value = !!query.value.trim();
      } catch (error) {
        console.error('Error searching for songs:', error);
      }
    };

    const handleInput = () => {
      if (query.value.trim()) {
        search();
      } else {
        showResults.value = false; // Hide results when input is empty
      }
    };

    const handleFocus = () => {
      if (query.value.trim()) {
        showResults.value = true; // Show results when input gains focus and there is text
      }
    };

    const handleClick = (event: MouseEvent) => {
      // Close results if the click is outside of the results container
      if (!(event.target as HTMLElement).closest('.flex')) {
        showResults.value = false;
      }
    };

    const selectSong = (song: Song) => {
      props.onSongSelect(song);
      showResults.value = false; // Hide results after selecting a song
    };

    onMounted(() => {
      document.addEventListener('click', handleClick);
    });

    return { query, searchResults, showResults, handleInput, handleFocus, selectSong };
  },
});
</script>
