import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import imageParser from '../../middlewares/uploadImage';
import Cars from '../controllers/cars';

const {
	postCarAdValidator,
	checkCarId,
	checkCarADStatus,
	checkCarADPrice
} = validator;
const {
	getCarOrCars,
	specificCar,
	postCarAd,
	deleteCarAd,
	changeCarAdPrice,
	changeCarAdStatus
} = Cars;
const router = express.Router();
router.get(
	'/',
	getCarOrCars
);
router.get('/:carId', checkCarId(), specificCar);
router.post(
	'/',
	imageParser.single('carImage'),
	postCarAdValidator(),
	postCarAd
);
router.delete('/:carId', checkCarId(), deleteCarAd);
router.patch('/:carId/price', checkCarADPrice(), changeCarAdPrice);
router.patch('/:carId/status', checkCarADStatus(), changeCarAdStatus);
export default router;
