import express from 'express';
// import validator from '../../middlewares/getRouteHandler';
import Cars from '../controllers/cars';

const {cars, specificCar, deleteCarAd, postCarAd, changeAdPriceOrStatus} = Cars;
const router = express.Router();
router.get('/', cars);
router.post('/', postCarAd);
router.get('/:carId', specificCar);
router.delete('/:carId', deleteCarAd);
router.patch('/:carId/:param', changeAdPriceOrStatus);
export default router;
