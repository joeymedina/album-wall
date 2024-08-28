import * as albumDal from '../dal/Album'
import {type AlbumInput, type AlbumOutput } from '../models/album'
import { GetAllAlbumsFilters } from '../dal/types'

export const create = (payload: AlbumInput): Promise<AlbumOutput> => {
    return albumDal.create(payload)
}
export const update = (id: string, payload: Partial<AlbumInput>): Promise<AlbumOutput> => {
    return albumDal.update(id, payload)
}
export const getById = (id: string): Promise<AlbumOutput> => {
    return albumDal.getById(id)
}

export const getAllByCollectionId = (id: string): Promise<AlbumOutput[]> => {
    return albumDal.getAllByCollectionId(id)
}

export const deleteById = (id: string): Promise<boolean> => {
    return albumDal.deleteById(id)
}

export const getAll = (filters: GetAllAlbumsFilters): Promise<AlbumOutput[]> => {
    return albumDal.getAll(filters)
}