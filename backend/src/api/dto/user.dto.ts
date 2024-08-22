import { Optional } from "sequelize/types"

export type CreateUserDTO = {
    name: string;
    password?: string;
    email: string;
    user_id: string;
}

export type UpdateUserDTO = Optional<CreateUserDTO, 'password'>

export type FilterUsersDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}