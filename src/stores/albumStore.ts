import { defineStore } from 'pinia';
import { getAlbumsByCollectionId, getAllCollections } from '../services/albumWallDataService';

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

interface Collection {
  collection_id?: string;
  name?: string;
  owner_id?: string;
}

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    selectedAlbums: [] as Album[],
    collections: [] as Collection[],
    currentCollection: null as Collection | null,
  }),

  actions: {
    addAlbum(album: Album) {
      if (!this.selectedAlbums.some(a => a.album_id === album.album_id)) {
        this.selectedAlbums.push(album);
        this.saveAlbums();
      }
    },

    setCurrentCollection(collectionId: string) {
      this.currentCollection = this.collections.find(c => c.collection_id === collectionId) || null;
    },

    async loadAlbumsForCollection(collectionId: string) {
      // Call to backend to fetch albums for the selected collection
      const albums = await getAlbumsByCollectionId(collectionId);
      this.selectedAlbums = albums as Album[];
    },

    saveAlbums() {
      localStorage.setItem('selectedAlbums', JSON.stringify(this.selectedAlbums));
    },

    loadAlbumsFromStorage() {
      const savedAlbums = localStorage.getItem('selectedAlbums');
      if (savedAlbums) {
        this.selectedAlbums = JSON.parse(savedAlbums);
      }
    //   else {
    //     getAllCollections().then((result) => this.collections = result as Collection[]);
    //   }
    },

    saveCollections() {
      localStorage.setItem('collections', JSON.stringify(this.collections));
    },

    loadCollectionsFromStorage() {
      const savedCollections = localStorage.getItem('collections');
      if (savedCollections) {
        this.collections = JSON.parse(savedCollections);
      }
    }
  },
});
