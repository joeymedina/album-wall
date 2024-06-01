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

export default { getFeaturedPlaylists };
