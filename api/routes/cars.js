import express from 'express';
// import validator from '../../middlewares/getRouteHandler';
import Cars from '../controllers/cars';

const {cars, specificCar, deleteCarAd} = Cars;
const router = express.Router();
router.get('/', cars);
router.get('/:carId', specificCar);
router.delete('/:carId', deleteCarAd);
export default router;
