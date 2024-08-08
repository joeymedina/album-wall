<template>
    <div class="flex flex-col items-center w-full">
      <draggable
        :list="songs"
        @end="updateSongsOrder"
        item-key="id"
        class="grid grid-cols-3 gap-4 w-full"
      >
        <template #item="{ element, index }">
          <div :key="element.id" class="relative border p-4 rounded shadow">
            <button @click="removeSong(index)" class="absolute top-1 right-1 text-red-500 hover:text-red-700">✖</button>
            <img :src="element.artworkUrl" alt="Artwork" class="w-full h-32 object-cover mb-2">
            <p class="font-semibold">{{ element.name }}</p>
            <p class="text-sm text-gray-500">{{ element.artist }}</p>
          </div>
        </template>
      </draggable>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType, watch, computed } from 'vue';
  import draggable from 'vuedraggable';
  
  interface Song {
    id: string;
    name: string;
    artist: string;
    artworkUrl: string;
  }
  
  export default defineComponent({
    name: 'SelectedSongs',
    components: {
      draggable,
    },
    props: {
      selectedSongs: {
        type: Array as PropType<Song[]>,
        required: true,
      },
    },
    setup(props, { emit }) {
      const songs = computed({
        get: () => props.selectedSongs,
        set: (value: Song[]) => emit('update:selected-songs', value),
      });
  
      watch(songs, (newSongs) => {
        console.log('Songs updated:', newSongs);
      });
  
      const updateSongsOrder = () => {
        console.log('Songs order updated:', songs.value);
        emit('update:selected-songs', [...songs.value]);
      };
  
      const removeSong = (index: number) => {
        const newSongs = [...songs.value];
        newSongs.splice(index, 1);
        console.log('Removing song at index:', index);
        console.log('Updated songs:', newSongs);
        emit('update:selected-songs', newSongs);
      };
  
      return { songs, updateSongsOrder, removeSong };
    },
  });
  </script>
  