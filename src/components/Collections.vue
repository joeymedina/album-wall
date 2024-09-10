<template>
    <div class="collection-manager">
        <h2 class="text-xl font-bold mb-4">Manage Collections</h2>

        <!-- Display existing collections -->
        <div v-if="collections.length" class="collections-list">
            <h3 class="font-semibold">Select a Collection:</h3>
            <ul>
                <li v-for="collection in collections" :key="collection.collection_id" class="collection-item">
                    <button @click="selectCollection(collection)"
                        :class="{ 'font-bold': selectedCollection?.collection_id === collection.collection_id }"
                        class="py-1 px-2 rounded hover:bg-gray-200">
                        {{ collection.name }}
                    </button>
                    <button @click="DeleteCollection(collection.collection_id)" class="text-red-500 ml-2">
                        ✖
                    </button>
                </li>
            </ul>
        </div>

        <!-- No collections message -->
        <div v-else class="text-gray-500">
            <p>No collections available. Create one below!</p>
        </div>

        <!-- Create new collection form -->
        <div class="mt-4">
            <input v-model="newCollectionName" type="text" placeholder="New collection name"
                class="border p-2 w-full mb-2" />
            <button @click="CreateCollection"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                Create Collection
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getAllCollections, createCollection, deleteCollection } from '../services/albumWallDataService';

interface Collection {
    collection_id?: string;
    name?: string;
    owner_id?: string;
}

export default defineComponent({
    name: 'Collection',
    emits: ['collection-selected', 'collection-created', 'delete-collection'],
    setup(_, { emit }) {
        const collections = ref<Collection[]>([]);
        const selectedCollection = ref<Collection | null>(null);
        const newCollectionName = ref('');

        // Load collections when component is mounted
        onMounted(async () => {
            collections.value = await getAllCollections();
        });

        // Create a new collection
        const CreateCollection = async () => {
            if (newCollectionName.value.trim() === '') return;
            const collection: Collection = {
                name: newCollectionName.value.trim(),
                owner_id: '335c6b39-4617-4324-af6c-6281e74398f5',
            }
            const newCollection = await createCollection(collection);
            collections.value.push(newCollection);
            // emit('collection-created', collection);
            newCollectionName.value = '';
            selectedCollection.value = newCollection;
            emit('collection-selected', newCollection.collection_id);
        };

        // Select a collection and notify parent component
        const selectCollection = (collection: Collection) => {
            selectedCollection.value = collection;
            emit('collection-selected', collection.collection_id);
        };

        // Delete a collection
        const DeleteCollection = async (collectionId: string | undefined) => {
            await deleteCollection(collectionId);
            collections.value = collections.value.filter(c => c.collection_id !== collectionId);
            emit('delete-collection', collectionId);
            if (selectedCollection.value?.collection_id === collectionId) {
                if (collections.value.length > 0) {
                    // Select the next available collection (could be the first in the remaining list)
                    selectedCollection.value = collections.value[0];
                    emit('collection-selected', selectedCollection.value.collection_id);
                } else {
                    // If no collections are left, set selectedCollection to null
                    selectedCollection.value = null;
                    emit('collection-selected', null);
                }
            }
        };

        return {
            collections,
            selectedCollection,
            newCollectionName,
            CreateCollection,
            selectCollection,
            DeleteCollection,
        };
    },
});
</script>

<style scoped>
.collection-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}
</style>