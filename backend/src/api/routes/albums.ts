import { Router, Request, Response} from 'express'
import * as albumController from '../controllers/albums'
import { CreateAlbumDTO, UpdateAlbumDTO} from '../dto/album.dto'
import { GetAllAlbumsFilters } from '../../db/dal/types'

const albumsRouter = Router()

albumsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id)
    const result = await albumController.getById(id)
    return res.status(200).send(result)
});
albumsRouter.put('/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id)
    const payload:UpdateAlbumDTO = req.body

    const result = await albumController.update(id, payload)
    return res.status(201).send(result)
});
albumsRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id)

    const result = await albumController.deleteById(id)
    return res.status(204).send({
        success: result
    })
});
albumsRouter.post('/', async (req: Request, res: Response) => {
    const payload:CreateAlbumDTO = req.body
    const result = await albumController.create(payload)
    return res.status(200).send(result)
});
albumsRouter.get('/', async (req: Request, res: Response) => {
    const filters: GetAllAlbumsFilters = req.query
    
    const results = await albumController.getAll(filters)
    
    return res.status(200).send(results)
});
export default albumsRouter 