import express from 'express';
import cars from '../controllers/cars';

const router = express.Router();
router.get('/', cars.allNewAvailableCars);
export default router;