import {Router} from 'express';
import clientRouter from './client.routes';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('MERN Azure running - Server');
});

router.use('/client', clientRouter);

export default router;