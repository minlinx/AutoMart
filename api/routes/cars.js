import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import checkAuthentication from '../../middlewares/checkUserAuthentication';
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
	checkAuthentication,
	getCarOrCars
);
router.get('/:carId', checkAuthentication, checkCarId(), specificCar);
router.post(
	'/',
	checkAuthentication,
	imageParser.single('carImage'),
	postCarAdValidator(),
	postCarAd
);
router.delete('/:carId', checkAuthentication, checkCarId(), deleteCarAd);
router.patch('/:carId/price', checkAuthentication, checkCarADPrice(), changeCarAdPrice);
router.patch('/:carId/status', checkAuthentication, checkCarADStatus(), changeCarAdStatus);
export default router;
