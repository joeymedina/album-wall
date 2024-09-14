<template>
  <div class="collection-manager">

    <div v-if="albumStore.collections.length" class="tab-container">
      <ul class="tabs">
        <li v-for="collection in albumStore.collections" :key="collection.collection_id" @click="selectCollection(collection)"
          :class="{ 'active-tab': albumStore.currentCollection?.collection_id === collection.collection_id }"
          class="tab-item">
          {{ collection.name }}
          <button @click.stop="DeleteCollection(collection.collection_id)" class="text-red-500 ml-2">
            ✖
          </button>
        </li>
      </ul>

      <div class="tab-content">
        <Albums />
      </div>
    </div>

    <div v-else class="text-gray-500">
      <p>No collections available. Create one below!</p>
    </div>

    <div class="mt-4">
      <input v-model="newCollectionName" type="text" placeholder="New collection name" class="border p-2 w-full mb-2" />
      <button @click="CreateCollection" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Create Collection
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type PropType } from 'vue';
import Albums from './Albums.vue';
import { getAllCollections, createCollection, deleteCollection, getAlbumsByCollectionId } from '../services/albumWallDataService';
import { useAlbumStore } from '../stores/albumStore';

interface Collection {
  collection_id?: string;
  name?: string;
  owner_id?: string;
}

export default defineComponent({
  name: 'Collection',
  components: {
    Albums,
  },
  setup() {
    const albumStore = useAlbumStore();
    const newCollectionName = ref('');

    onMounted(async () => {
      albumStore.collections = await getAllCollections();
      if (albumStore.collections.length > 0) {
        albumStore.currentCollection = albumStore.collections[0];
        albumStore.loadAlbumsForCollection(albumStore.currentCollection.collection_id!);
      }
    });

    const CreateCollection = async () => {
      if (newCollectionName.value.trim() === '') return;
      const collection: Collection = {
        name: newCollectionName.value.trim(),
        owner_id: '335c6b39-4617-4324-af6c-6281e74398f5',
      };
      const newCollection: Collection = await createCollection(collection);
      albumStore.collections.push(newCollection);
      newCollectionName.value = '';
      albumStore.currentCollection = newCollection;
      albumStore.loadAlbumsForCollection(newCollection.collection_id!);
    };

    const selectCollection = (collection: Collection) => {
      albumStore.setCurrentCollection(collection.collection_id!);
      albumStore.loadAlbumsForCollection(collection.collection_id!);
    };

    const DeleteCollection = async (collectionId: string | undefined) => {
      await deleteCollection(collectionId);
      albumStore.collections = albumStore.collections.filter(c => c.collection_id !== collectionId);
      if (albumStore.currentCollection?.collection_id === collectionId) {
        albumStore.currentCollection = albumStore.collections.length > 0 ? albumStore.collections[0] : null;
        if (albumStore.currentCollection) {
          albumStore.loadAlbumsForCollection(albumStore.currentCollection.collection_id!);
        } else {
          albumStore.selectedAlbums = [];
        }
      }
    };

    return {
      albumStore,
      newCollectionName,
      CreateCollection,
      selectCollection,
      DeleteCollection,
    };
  },
});
</script>
<style scoped>
.tab-container {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #e5e7eb;
}

.tab-item {
  padding: 10px 20px;
  margin-right: 5px;
  cursor: pointer;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.tab-item:hover {
  background-color: #e5e7eb;
}

.active-tab {
  background-color: #ffffff;
  border-bottom: 2px solid transparent;
  font-weight: bold;
}

.tab-content {
  padding: 20px;
  border: 1px solid #d1d5db;
  border-radius: 0 0 8px 8px;
  background-color: #ffffff;
}
</style>