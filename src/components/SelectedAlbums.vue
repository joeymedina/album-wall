<template>
  <div class="flex flex-col items-center w-full">
    <draggable
      :list="albums"
      @end="updateAlbumsOrder"
      item-key="id"
      class="grid grid-cols-3 gap-4 w-full"
    >
      <template #item="{ element, index }">
        <div
          :key="element.id"
          class="relative border p-4 rounded shadow group"
        >
          <button
            @click="removeAlbum(index)"
            class="absolute top-1 right-1 text-red-500 hover:text-red-700"
          >
            ✖
          </button>
          <div class="relative">
            <img
              :src="element.artwork_url"
              alt="Artwork"
              class="w-full h-32 object-cover mb-2"
            />
          </div>
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

interface Album {
  id: string;
  name: string;
  artist: string;
  artwork_url: string;
  sequence: number;
}

export default defineComponent({
  name: 'SelectedAlbums',
  components: {
    draggable,
  },
  props: {
    selectedAlbums: {
      type: Array as PropType<Album[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const albums = computed({
      get: () => props.selectedAlbums,
      set: (value: Album[]) => emit('update:selected-albums', value),
    });

    watch(albums, (newAlbums) => {
      console.log('Albums updated:', newAlbums);
    });

    const updateAlbumsOrder = () => {
      console.log('Albums order updated:', albums.value);
      emit('update:selected-albums', [...albums.value]);
    };

    const removeAlbum = (index: number) => {
      const newAlbums = [...albums.value];
      newAlbums.splice(index, 1);
      console.log('Removing album at index:', index);
      console.log('Updated albums:', newAlbums);
      emit('update:selected-albums', newAlbums);
    };

    return { albums, updateAlbumsOrder, removeAlbum };
  },
});
</script>
