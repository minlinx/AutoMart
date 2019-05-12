import express from 'express';
import cars from '../controllers/cars';
import validator from '../../middlewares/getRouteHandler';

const router = express.Router();
router.get('/', validator.getAllNewVehicles(), cars);
export default router;
