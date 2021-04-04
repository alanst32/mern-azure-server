import {Router} from 'express';
import studentRouter from './student.routes';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('MERN Azure running - Server');
});

router.use('/student', studentRouter);

export default router;