import { GetAllAlbumsFilters } from '../../../db/dal/types'
import * as service from '../../../db/services/AlbumService'
import { CreateAlbumDTO, UpdateAlbumDTO } from '../../dto/album.dto'
import { album } from '../../interfaces'
import * as mapper from './mapper'

export const create = async(payload: CreateAlbumDTO): Promise<album> => {
    return mapper.toAlbum(await service.create(payload))
}
export const update = async (id: string, payload: UpdateAlbumDTO): Promise<album> => {
    return mapper.toAlbum(await service.update(id, payload))
}
export const getById = async (id: string): Promise<album> => {
    return mapper.toAlbum(await service.getById(id))
}
export const deleteById = async(id: string): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}
export const getAll = async(filters: GetAllAlbumsFilters): Promise<album[]> => {
    return (await service.getAll(filters)).map(mapper.toAlbum)
}