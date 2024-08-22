import {user} from '../../interfaces'
import {UserOutput} from '../../../db/models/User'

export const toUser = (user: UserOutput): user => {
    return {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        password: user.password,
        // createdAt: user.createdAt,
        // updatedAt: user.updatedAt,
        // deletedAt: user.deletedAt,
    }
}