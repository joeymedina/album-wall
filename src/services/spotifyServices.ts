// src/services/spotifyService.ts
import axios from 'axios';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const authEndpoint = 'https://accounts.spotify.com/api/token';

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Song {
  id: string;
  name: string;
  artist: string;
  artworkUrl: string; // Add artwork URL property
}

const getAccessToken = async (): Promise<string> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const { data } = await axios.post(authEndpoint, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    }
  });

  return data.access_token;
};

const getFeaturedPlaylists = async (): Promise<Playlist[]> => {
  const token = await getAccessToken();

  const { data } = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data.playlists.items;
};

const searchSongs = async (query: string): Promise<Song[]> => {
  try {
    const token = await getAccessToken();

    const { data } = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return data.tracks.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      artist: item.artists[0].name,
      artworkUrl: item.album.images[0].url
    }));
  } catch (error) {
    console.error('Error searching for songs:', error);
    throw error; // Propagate the error to the caller
  }
};

export default { getFeaturedPlaylists, searchSongs };
