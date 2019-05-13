import express from 'express';
// import validator from '../../middlewares/getRouteHandler';
import cars from '../controllers/cars';
const router = express.Router();
router.get('/', cars.cars);
router.get('/:carId', cars.specificCar);
export default router;
