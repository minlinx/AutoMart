import express from 'express';
// import validator from '../../middlewares/getRouteHandler';
import Cars from '../controllers/cars';

const {cars, specificCar, deleteCarAd, postCarAd, changeAdPrice} = Cars;
const router = express.Router();
router.get('/', cars);
router.post('/', postCarAd);
router.get('/:carId', specificCar);
router.delete('/:carId', deleteCarAd);
router.patch('/:carId/:price', changeAdPrice);
export default router;
