import { Router } from 'express';
import { products, productById } from '../controllers/products.controller.js';

const router = Router();
router.get('/', products);
router.get('/:pid', productById);

export default router;
