

  <template>
    <div class="flex flex-col items-center justify-center h-screen" @click="closeResults">
      <input type="text" v-model="query" @input="search" placeholder="Search for a song..." class="rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-indigo-500" style="width: 35rem;">
      <ul v-if="searchResults.length" class="mt-4 border border-gray-300 w-80 max-h-96 overflow-y-auto rounded shadow-md" style="width: 40rem;" @click.stop>
        <li v-for="song in searchResults" :key="song.id" class="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100">
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
  import { defineComponent, ref } from 'vue';
  import spotifyService from '../services/spotifyServices';
  
  interface Song {
    id: string;
    name: string;
    artist: string;
  }
  
  export default defineComponent({
    name: 'SongSearch',
    setup() {
      const query = ref('');
      const searchResults = ref<Song[]>([]);
  
      const search = async () => {
        try {
          searchResults.value = await spotifyService.searchSongs(query.value);
        } catch (error) {
          console.error('Error searching for songs:', error);
        }
      };

      const closeResults = (event: MouseEvent) => {
      // Close results if the click is outside of the results container
      if (!(event.target as HTMLElement).closest('.relative')) {
        searchResults.value = [];
      }
    };
      return { query, searchResults, search, closeResults };
    },
  });
  </script>
  
  <!-- <style scoped lang="css">
  /* You can import Tailwind CSS here if you're not using a separate CSS file */
  </style> -->
  