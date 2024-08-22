import { GetAllUsersFilters } from '../../../db/dal/types'
import * as service from '../../../db/services/UserService'
import {CreateUserDTO, UpdateUserDTO} from '../../dto/user.dto'
import {user} from '../../interfaces'
import * as mapper from './mapper'

export const create = async(payload: CreateUserDTO): Promise<user> => {
    return mapper.toUser(await service.create(payload))
}
export const update = async (id: string, payload: UpdateUserDTO): Promise<user> => {
    return mapper.toUser(await service.update(id, payload))
}
export const getById = async (id: string): Promise<user> => {
    return mapper.toUser(await service.getById(id))
}
export const deleteById = async(id: string): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}
export const getAll = async(filters: GetAllUsersFilters): Promise<user[]> => {
    return (await service.getAll(filters)).map(mapper.toUser)
}