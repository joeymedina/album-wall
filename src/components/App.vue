<template>
  <div class="app-container">
    <div class="search-bar-container">
      <AlbumSearch />
    </div>
    <Collections />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import AlbumSearch from './AlbumSearch.vue';
import Collections from './Collections.vue';
import { useAlbumStore } from '../stores/albumStore';

export default defineComponent({
  name: 'App',
  components: {
    AlbumSearch,
    Collections
  },
  setup() {
    const albumStore = useAlbumStore();

    onMounted(() => {
      albumStore.loadAlbumsFromStorage();
      albumStore.loadCollectionsFromStorage();
    });

    return {
      albumStore
    };
  },
});
</script>
