import { Router } from 'express';
import { newSupplier } from '../controllers/supplier.js';
import { verifyTokenMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post('/new',verifyTokenMiddleware,newSupplier);



export default router;