import { Router, Request, Response} from 'express'
import * as albumController from '../controllers/albums'
import { CreateAlbumDTO, UpdateAlbumDTO} from '../dto/album.dto'
import { GetAllAlbumsFilters } from '../../db/dal/types'
import { album } from '../interfaces'

const albumsRouter = Router()

albumsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id)
    const result = await albumController.getById(id)
    return res.status(200).send(result)
});

albumsRouter.put('/sequence/', async (req: Request, res: Response) => {
    let albums  = req.body; // Expect an array of albums with updated sequences
    let result: album[] = []
    try {
      for (const album of albums) {
        const payload:UpdateAlbumDTO = album
        result.push(await albumController.update(album.album_id, payload));
      }
      return res.status(201).send(result);
    } catch (err) {
      res.status(500).json({ error: 'Unable to update album sequence' });
    }
});

albumsRouter.put('/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id)
    const payload:UpdateAlbumDTO = req.body

    const result = await albumController.update(id, payload)
    return res.status(201).send(result)
});



albumsRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id)

    const result : boolean = await albumController.deleteById(id)
    return res.status(204).send(result)
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

albumsRouter.get('/collection/:id', async (req: Request, res: Response) => {
    
    const id = String(req.params.id)
    
    const results = await albumController.getAllByCollectionId(id)
    
    return res.status(200).send(results)
});

export default albumsRouter 