
import * as userDal from '../dal/User'
import {type UserInput, type UserOutput} from '../models/User'
import { GetAllUsersFilters } from '../dal/types'

export const create = (payload: UserInput): Promise<UserOutput> => {
    return userDal.create(payload)
}
export const update = (id: string, payload: Partial<UserInput>): Promise<UserOutput> => {
    return userDal.update(id, payload)
}
export const getById = (id: string): Promise<UserOutput> => {
    return userDal.getById(id)
}
export const deleteById = (id: string): Promise<boolean> => {
    return userDal.deleteById(id)
}
export const getAll = (filters: GetAllUsersFilters): Promise<UserOutput[]> => {
    return userDal.getAll(filters)
}