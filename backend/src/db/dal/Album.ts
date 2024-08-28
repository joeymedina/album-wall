import { Op }  from 'sequelize'
import Album from '../models/album'
import { type AlbumInput, type AlbumOutput } from '../models/album'
import { GetAllAlbumsFilters } from './types'

export const create = async (payload: AlbumInput): Promise<AlbumOutput> => {
    const album = await Album.create(payload)
    return album
}

export const update = async (id: string, payload: Partial<AlbumInput>): Promise<AlbumOutput> => {
    const album = await Album.findByPk(id)
    if (!album) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedAlbum = await (album as Album).update(payload)
    return updatedAlbum
}

export const getById = async (id: string): Promise<AlbumOutput> => {
    const album = await Album.findByPk(id)
    if (!album) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return album
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedAlbumCount = await Album.destroy({
        where: {album_id: id}
    })
    return !!deletedAlbumCount
}

export const getAll = async (filters?: GetAllAlbumsFilters): Promise<AlbumOutput[]> => {
    return Album.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const getAllByCollectionId = async (id: string): Promise<AlbumOutput[]> => {
    return Album.findAll({
        where: {
            collection_id: id
        }
    })
}