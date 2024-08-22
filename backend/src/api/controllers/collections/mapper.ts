import { collection } from '../../interfaces'
import { CollectionOutput } from '../../../db/models/collection'

export const toCollection = (collection: CollectionOutput): collection => {
    return {
        collection_id: collection.collection_id,
        name: collection.name,
        owner_id: collection.owner_id
    }
}