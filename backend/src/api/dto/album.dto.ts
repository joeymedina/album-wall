import { Optional } from "sequelize/types"

export type CreateAlbumDTO = {
    album_id: string;
    name: string;
    artist: string
    artwork_url: string;
    spotify_uri: string;
    collection_id: string;
    user_id: string;
    sequence: number;
}

export type UpdateAlbumDTO = Optional<CreateAlbumDTO, 'name'>

export type FilterUsersDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}