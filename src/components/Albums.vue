<template>
  <div class="flex flex-col items-center w-full">
    <draggable :list="albums" item-key="id" class="grid grid-cols-3 gap-4 w-full">
      <template #item="{ element, index }">
        <div :key="element.id" class="relative border p-4 rounded shadow group">
          <button @click="removeAlbum(index)" class="absolute top-1 right-1 text-red-500 hover:text-red-700">✖</button>
          <div class="relative">
            <img :src="element.artwork_url" alt="Artwork" class="w-full h-32 object-cover mb-2" />
          </div>
          <p class="font-semibold">{{ element.name }}</p>
          <p class="text-sm text-gray-500">{{ element.artist }}</p>
        </div>
      </template>
    </draggable>
    <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="saveChanges">Save Changes</button>
  </div>
</template>


<script lang="ts">
import { defineComponent, type PropType, watch, computed } from 'vue';
import draggable from 'vuedraggable';
import { deleteAlbum, updateAlbumSequences } from '../services/albumWallDataService';
import type { Collection } from '../interfaces/collection';
import { useAlbumStore } from '../stores/albumStore';
interface Album {
  album_id?: string;
    name?: string;
    artist?: string
    artwork_url?: string;
    spotify_uri?: string;
    collection_id?: string;
    user_id?: string;
    sequence?: number;
}

export default defineComponent({
  name: 'Albums',
  components: {
    draggable,
  },
  setup() {
    const albumStore = useAlbumStore();

    const albums = computed({
      get: () => albumStore.selectedAlbums,
      set: (value: Album[]) => albumStore.selectedAlbums = value,
    });

    watch(albums, (newAlbums) => {
      console.log('Albums updated:', newAlbums);
    });

    const removeAlbum = async (index: number) => {
      console.log(albums.value[index]);
      const albumId = albums.value[index].album_id;

      console.log('Removing album:', albumId);
      try {
        const deleted = await deleteAlbum(albumId);
        if (deleted) {
          const newAlbums = [...albums.value];
          newAlbums.splice(index, 1);
          console.log('Removing album at index:', index);
          console.log('Updated albums:', newAlbums);
          albumStore.selectedAlbums = newAlbums;
        } else {
          console.error('Failed to delete album');
        }
      } catch (error) {
        console.error('Error deleting album:', error);
      }
    };
    const saveChanges = async () => {
      // Update the sequence in the albums array based on their current order
      const updatedAlbums = albums.value.map((album, index) => ({
        ...album,
        sequence: index + 1, // Assign new sequence based on the new order
      }));

      // Optimistically emit the new album order
      albumStore.selectedAlbums = updatedAlbums;
      // Send the updated sequences to the backend
      try {
        await updateAlbumSequences(updatedAlbums);
        console.log('Album sequences updated successfully.');
      } catch (error) {
        console.error('Failed to update album sequences:', error);
      }
    };

    return { albums, removeAlbum, saveChanges };
  },
});
</script>