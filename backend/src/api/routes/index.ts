import { Router } from 'express'
import usersRouter from './users'
import albumsRouter from './albums'
import collectionsRouter from './collections'


const router = Router()

router.use('/users', usersRouter)
router.use('/albums', albumsRouter)
router.use('/collections', collectionsRouter)



export default router