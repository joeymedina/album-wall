import { Op }  from 'sequelize'
import Collection from '../models/collection'
import { type CollectionInput, type CollectionOutput } from '../models/collection'
import { GetAllCollectionsFilters } from './types'

export const create = async (payload: CollectionInput): Promise<CollectionOutput> => {
    const collection = await Collection.create(payload)
    return collection
}

export const update = async (id: string, payload: Partial<CollectionInput>): Promise<CollectionOutput> => {
    const collection = await Collection.findByPk(id)
    if (!collection) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedCollection = await (collection as Collection).update(payload)
    return updatedCollection
}

export const getById = async (id: string): Promise<CollectionOutput> => {
    const collection = await Collection.findByPk(id)
    if (!collection) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return collection
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedCollectionCount = await Collection.destroy({
        where: {collection_id: id}
    })
    return !!deletedCollectionCount
}

export const getAll = async (filters?: GetAllCollectionsFilters): Promise<CollectionOutput[]> => {
    return Collection.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const getAllByOwnerId = async (ownerId: string): Promise<CollectionOutput[]> => {
        return Collection.findAll({
            where: {
                owner_id: ownerId
            },
        })
}