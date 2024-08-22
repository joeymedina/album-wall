interface ListFilters {
    isDeleted?: boolean;
    includeDeleted?: boolean;
}

export interface GetAllAlbumsFilters extends ListFilters {}
export interface GetAllCollectionsFilters extends ListFilters {}
export interface GetAllUsersFilters extends ListFilters {}

