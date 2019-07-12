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
router.get('/:car-id', checkAuthentication, checkCarId(), specificCar);
router.post(
	'/',
	checkAuthentication,
	imageParser.single('car_image'),
	postCarAdValidator(),
	postCarAd
);
router.delete('/:car-id', checkAuthentication, checkCarId(), deleteCarAd);
router.patch('/:car-id/price', checkAuthentication, checkCarADPrice(), changeCarAdPrice);
router.patch('/:car-id/status', checkAuthentication, checkCarADStatus(), changeCarAdStatus);
export default router;
