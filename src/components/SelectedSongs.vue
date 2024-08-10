<template>
  <div class="flex flex-col items-center w-full">
    <draggable
      :list="songs"
      @end="updateSongsOrder"
      item-key="id"
      class="grid grid-cols-4 gap-3 w-full">
      <template #item="{ element, index }">
        <div :key="element.id" class="absolute card-container">
        <vue-flip active-click width="300px" height="50px">
          <template v-slot:front>
                    <button @click.stop="removeSong(index)" class="delete-card">✖</button>
                    <img :src="element.artworkUrl" alt="Artwork" class="w-full h-32 object-cover mb-2">
                  </template>
                  <template v-slot:back>
                    <p class="font-semibold">{{ element.name }}</p>
                    <p class="text-sm text-gray-500">{{ element.artist }}</p>
                  </template>
        </vue-flip>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed, ref } from 'vue';
import draggable from 'vuedraggable';
import { VueFlip } from 'vue-flip';

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
    VueFlip,
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


    const updateSongsOrder = () => {
      emit('update:selected-songs', [...songs.value]);
    };

    const removeSong = (index: number) => {
      const newSongs = [...songs.value];
      newSongs.splice(index, 1);
      emit('update:selected-songs', newSongs);
    };

    return { songs, updateSongsOrder, removeSong };
  },
});
</script>

<style scoped>
.card-container {
  position: relative;
  width: 150px;
  height: 175px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-card {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 15px;
  opacity: .4;
  transition: all 0.5s ease;
}

.delete-card:hover {
  opacity: 1;
  transform: rotate(360deg);
}

</style>

  