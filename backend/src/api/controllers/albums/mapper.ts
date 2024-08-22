import { album } from '../../interfaces'
import { AlbumOutput } from '../../../db/models/album'

export const toAlbum = (album: AlbumOutput): album => {
    return {
        album_id: album.album_id,
        name: album.name,
        artist: album.artist,
        spotify_uri: album.spotify_uri,
        artwork_url: album.artwork_url,
        collection_id: album.collection_id,
        user_id: album.user_id
    }
}