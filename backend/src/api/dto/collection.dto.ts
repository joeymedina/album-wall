import { Optional } from "sequelize/types"

export type CreateCollectionDTO = {
    collection_id: string;
    name: string;
    owner_id: string;
}

export type UpdateCollectionDTO = Optional<CreateCollectionDTO, 'name'>

export type FilterCollectionsDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}