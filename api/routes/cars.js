import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import Cars from '../controllers/cars';

const { postCarAdValidator, modifyCarAdValidator } = validator;
const { cars, postCarAd, specificCar, deleteCarAd, changeAdPriceOrStatus } = Cars;
const router = express.Router();
router.get('/', cars);
router.post('/', postCarAdValidator(), postCarAd);
router.get('/:carId', specificCar);
router.delete('/:carId', deleteCarAd);
router.patch('/:carId/:param', modifyCarAdValidator(), changeAdPriceOrStatus);
export default router;
