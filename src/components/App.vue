<template>
  <div class="app-container">
    <div class="search-bar-container">
      <AlbumSearch :current-collection="currentCollection" @album-select="addAlbum" />
    </div>
    <Collections :collections="collections" @collection-selected="loadAlbumsForCollection"
      @create-collection="createNewCollection" @delete-collection="deleteCollection" />

    <!-- <div class="selected-albums-container">
        <SelectedAlbums :selected-albums="selectedAlbums" @update:selected-albums="updateSelectedAlbums" />
      </div> -->
    <div class="selected-albums-container">
      <Albums :current-collection="currentCollection" :selected-albums="selectedAlbums"
        @update:selected-albums="updateSelectedAlbums" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import AlbumSearch from './AlbumSearch.vue';
import Collections from './Collections.vue';
import SelectedAlbums from './SelectedAlbums.vue';
import Albums from './Albums.vue';
import { getAlbumsByCollectionId, createCollection, getAllCollections } from '../services/albumWallDataService';
import type { Collection } from '../interfaces/collection';


interface Album {
  album_id: string;
  name: string;
  artist: string;
  artwork_url: string;
  sequence: number;
  spotify_uri: string;
}

export default defineComponent({
  name: 'App',
  components: {
    AlbumSearch,
    SelectedAlbums,
    Albums,
    Collections
  },

  setup() {
    const collections = ref<Collection[]>([]); // Array to hold collections
    const selectedAlbums = ref<Album[]>([]);
    const currentCollection = ref<Collection | null>(null); // Stores the currently selected collection

    // Load saved albums from localStorage on mount
    onMounted(() => {
      const savedAlbums = localStorage.getItem('selectedAlbums');
      const savedCollections = localStorage.getItem('collections');

      if (savedAlbums) {
        selectedAlbums.value = JSON.parse(savedAlbums);
      }

      if (savedCollections) {
        collections.value = JSON.parse(savedCollections);
        if (collections.value.length > 0) {
          // Select the next available collection (could be the first in the remaining list)
          currentCollection.value = collections.value[0];
        }
      } else {
        // Fetch collections from backend if not in localStorage
        // This is where you could call a service to load collections from your database
        loadCollections();
      }
    });
    // '003d6f44-aa3e-4ac1-afb9-66a13b165ab2'
    const loadAlbumsForCollection = (collectionId: string) => {
      const collection = collections.value.find(c => c.collection_id === collectionId);
      currentCollection.value = collection || null;
      getAlbumsByCollectionId(collectionId)
        .then((albums) => {
          selectedAlbums.value = albums as Album[];
          console.log('Albums fetched:', albums);
        })
        .catch((error) => {
          console.error('Error loading albums:', error);
        });
    };

    const createNewCollection = (collectionName: string) => {
      let collection: Collection = {
        name: collectionName,
        owner_id: '335c6b39-4617-4324-af6c-6281e74398f5',
      }
      createCollection(collection)
        .then((newCollection: Collection) => {
          collections.value.push(newCollection);
          saveCollections();
        })
        .catch((error) => {
          console.error('Error creating collection:', error);
        });
    };

    const addAlbum = (album: Album) => {
      if (!selectedAlbums.value.some(s => s.album_id === album.album_id)) {
        selectedAlbums.value.push(album);
        saveAlbums();
      }
    };

    const updateSelectedAlbums = (albums: Album[]) => {
      selectedAlbums.value = albums;
      saveAlbums();
    };

    const deleteCollection = (collectionId: string | undefined) => {
      if (collectionId) {
        collections.value = collections.value.filter(c => c.collection_id !== collectionId);
        saveCollections();
      }
    };

    const saveAlbums = () => {
      localStorage.setItem('selectedAlbums', JSON.stringify(selectedAlbums.value));
    };

    const saveCollections = () => {
      localStorage.setItem('collections', JSON.stringify(collections.value));
    };

    const loadCollections = () => {
      // Call service to load collections from backend
      getAllCollections().then((result) => collections.value = result);
    };
    return { selectedAlbums, collections, currentCollection, addAlbum, deleteCollection, updateSelectedAlbums, loadAlbumsForCollection, createNewCollection };
  },
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  /* Adjust if needed */
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
  margin-top: 80px;
  /* Adjust the margin as needed to ensure space between search bar and album cards */
  width: 100%;
  max-width: 600px;
}
</style>