import {Op} from 'sequelize'
import User from '../models/User'
import {type UserInput, type UserOutput} from '../models/User'
import { GetAllUsersFilters } from './types'

export const create = async (payload: UserInput): Promise<UserOutput> => {
    const user = await User.create(payload)
    return user
}

export const update = async (id: string, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updateduser = await (user as User).update(payload)
    return updateduser
}

export const getAll = async (filters?: GetAllUsersFilters): Promise<UserOutput[]> => {
    return User.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const getById = async (id: string): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return user
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deleteduserCount = await User.destroy({
        where: {user_id: id}
    })
    return !!deleteduserCount
}