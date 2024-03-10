import { Router } from 'express';
import { newSupplier } from '../controllers/supplier.js';

const router = Router();

router.post('/new',newSupplier);



export default router;