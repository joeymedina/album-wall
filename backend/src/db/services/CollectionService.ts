import * as collectionDal from '../dal/Collection'
import {type CollectionInput, type CollectionOutput } from '../models/collection'
import { GetAllCollectionsFilters } from '../dal/types'

export const create = (payload: CollectionInput): Promise<CollectionOutput> => {
    return collectionDal.create(payload)
}
export const update = (id: string, payload: Partial<CollectionInput>): Promise<CollectionOutput> => {
    return collectionDal.update(id, payload)
}
export const getById = (id: string): Promise<CollectionOutput> => {
    return collectionDal.getById(id)
}
export const deleteById = (id: string): Promise<boolean> => {
    return collectionDal.deleteById(id)
}

export const getAll = (filters: GetAllCollectionsFilters): Promise<CollectionOutput[]> => {
    return collectionDal.getAll(filters)
}

export const getAllByOwnerId = (ownerId: string): Promise<CollectionOutput[]> => {
    return collectionDal.getAllByOwnerId(ownerId)
}

