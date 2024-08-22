import { Router, Request, Response} from 'express'
import * as collectionController from '../controllers/collections'
import { CreateCollectionDTO, UpdateCollectionDTO} from '../dto/collection.dto'
import { GetAllCollectionsFilters } from '../../db/dal/types'

const collectionsRouter = Router()

collectionsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id)
    const result = await collectionController.getById(id)
    return res.status(200).send(result)
});

collectionsRouter.put('/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id)
    const payload:UpdateCollectionDTO = req.body

    const result = await collectionController.update(id, payload)
    return res.status(201).send(result)
});

collectionsRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id)

    const result = await collectionController.deleteById(id)
    return res.status(204).send({
        success: result
    })
});

collectionsRouter.post('/', async (req: Request, res: Response) => {
    const payload:CreateCollectionDTO = req.body
    const result = await collectionController.create(payload)
    return res.status(200).send(result)
});

collectionsRouter.get('/', async (req: Request, res: Response) => {
    const filters: GetAllCollectionsFilters = req.query
    
    const results = await collectionController.getAll(filters)
    
    return res.status(200).send(results)
});

collectionsRouter.get('/user/:id', async (req: Request, res: Response) => {
    
    const id = String(req.params.id)
    
    const results = await collectionController.getAllByOwnerId(id)
    
    return res.status(200).send(results)
});

export default collectionsRouter 