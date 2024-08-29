import axios from 'axios';
import type { Album } from '../interfaces/album';
import type { Collection } from '../interfaces/collection';
import type { User } from '../interfaces/user';

// ALBUMS
const getAllAlbums = async (): Promise<Album[]> => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/albums/");
      return data;
    } catch (error) {
      console.error("Error getting albums:", error);
      return [];
    }
}

const getAlbumById = async (id: string): Promise<Album> => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/albums/${id}`
      );
      return data;
    } catch (error) {
      console.error("Error getting album:", error);
      return {} as Album;
    }
}

const createAlbum = async (album: Album): Promise<Album> => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/albums/",
        album
      );
      return data;
    } catch (error) {
      console.error("Error creating album:", error);
      return album;
    }
}

const updateAlbum = async (id: string, album: Album): Promise<Album> => {
    
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/albums/${id}`,
        album
      );
      return data;
    } catch (error) {
      console.error("Error updating album:", error);
      return album;
    }
}

const deleteAlbum = async (id: string): Promise<boolean> => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/albums/${id}`
      );
      console.log("Album deleted successfully!");
      return data;
    } catch (error) {
      console.error("Error deleting album:", error);
      return false;
    }
}

const getAlbumsByCollectionId = async (collectionId: string): Promise<Album[]> => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/albums/collection/${collectionId}/`
    );
    return data;
}

// COLLECTION
const getAllCollections = async (): Promise<Collection[]> => {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/api/v1/collections/`
          );
          return data;
    } catch (error) {
      console.error("Error getting collections:", error);
      return [];
    }
}

const getCollectionById = async (id: string): Promise<Collection> => {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/api/v1/collections/${id}`
          );
          return data;
    } catch (error) { 
        console.error("Error getting collection:", error);
        return {} as Collection;
    }
}

const createCollection = async (collection: Collection): Promise<Collection> => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/collections/",
        collection
      );
      return data;
    } catch (error) {
      console.error("Error creating collection:", error);
      return collection;
    }
}

const updateCollection = async (id: string, collection: Collection): Promise<Collection> => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/collections/${id}`,
        collection
      );
      return data;
    } catch (error) {
      console.error("Error updating collection:", error);
      return collection;
    }
}

const deleteCollection = async (id: string): Promise<boolean> => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/collections/${id}`
      );
      console.log("Collection deleted successfully!");
      return data;
    } catch (error) {
      console.error("Error deleting collection:", error);
      return false;
    }
}

const getCollectionByUserId = async (userId: string): Promise<Collection[]> => {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/api/v1/collections/user/${userId}`
          );
          return data;
    } catch (error) {
        console.error("Error getting collection:", error);
        return [];
    }
}

// USER
const getAllUsers = async (): Promise<User[]> => {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/api/v1/users/`
          );
          return data;
    } catch (error) {
      console.error("Error getting users:", error);
      return [];
    }
}

const getUserById = async (id: string): Promise<User> => {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/api/v1/users/${id}`
          );
          return data;
    } catch (error) {
        console.error("Error getting user:", error);
        return {} as User;
    }
}   

const createUser = async (user: User): Promise<User> => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/",
        user
      );
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      return user;
    }
}   

const updateUser = async (id: string, user: User): Promise<User> => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/users/${id}`,
        user
      );
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      return user;
    }
}

const deleteUser = async (id: string): Promise<boolean> => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/users/${id}`
      );
      console.log("User deleted successfully!");
      return data;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
}


export { getAllAlbums, getAlbumById, createAlbum, updateAlbum, deleteAlbum, getAlbumsByCollectionId }
export { getAllCollections, getCollectionById, createCollection, updateCollection, deleteCollection, getCollectionByUserId }
export { getAllUsers, getUserById, createUser, updateUser, deleteUser }