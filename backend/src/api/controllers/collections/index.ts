import { GetAllCollectionsFilters } from '../../../db/dal/types'
import * as service from '../../../db/services/CollectionService'
import localCache from '../../../lib/local-cache'
import { CreateCollectionDTO, UpdateCollectionDTO } from '../../dto/collection.dto'
import { collection } from '../../interfaces'
import * as mapper from './mapper'
const primaryCacheKey = 'collections'

export const create = async(payload: CreateCollectionDTO): Promise<collection> => {
    return mapper.toCollection(await service.create(payload))
}
export const update = async (id: string, payload: UpdateCollectionDTO): Promise<collection> => {
    return mapper.toCollection(await service.update(id, payload))
}
export const getById = async (id: string): Promise<collection> => {
    return mapper.toCollection(await service.getById(id))
}
export const deleteById = async(id: string): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}
export const getAll = async(filters: GetAllCollectionsFilters): Promise<collection[]> => {
    // return (await service.getAll(filters)).map(mapper.toCollection)
    const collections = await service.getAll(filters).then((recipes) => recipes.map(mapper.toCollection))

    if (collections.length) {
        localCache.set(primaryCacheKey, collections)
    }

    return collections
}

export const getAllByOwnerId = async(ownerId: string): Promise<collection[]> => {
    return (await service.getAllByOwnerId(ownerId)).map(mapper.toCollection)
}