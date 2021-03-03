

import { Request, Response, Router } from 'express';
import { ClientInterface, ClientSearchRequestDto } from '../model/client.model';
import { 
    getClients, 
    insertClient, 
    updateClient,
    deleteClient
} from '../service/client.service';
const clientRouter = Router();

/**
 * GET: Get Clients list
 */
clientRouter.get('/', (req: Request<ClientSearchRequestDto>, res: Response) => {
    getClients(req, res);
});

/**
 * POST: Insert Client
 */
clientRouter.post('/', (req: Request<ClientInterface>, res: Response) => {
    insertClient(req, res);
});

/**
 * PUT: Update Client
 */
clientRouter.put('/', (req: Request<ClientInterface>, res: Response) => {
    updateClient(req, res);
});

/**
 * DELETE: Delete Client
 */
clientRouter.delete('/:id', (req: Request, res: Response) => {
    deleteClient(req, res);
});

export default clientRouter; 