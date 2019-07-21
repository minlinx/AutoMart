import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import checkAuthentication from '../../middlewares/checkUserAuthentication';
import imageParser from '../../middlewares/uploadImage';
import checkQueryParams from '../../middlewares/checkQueryParams';
import badRequestError from '../../middlewares/400Error';
import checkValidationErrrors from '../../middlewares/checkValidationErrors';
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
	getCarOrCars,
	badRequestError
);
router.get('/:car_id', checkQueryParams, checkCarId(), checkValidationErrrors, checkAuthentication, specificCar, badRequestError);
router.post(
	'/',
	checkQueryParams,
	imageParser.single('car_image'),
	postCarAdValidator(),
	checkValidationErrrors,
	checkAuthentication,
	postCarAd, badRequestError
);
router.delete('/:car_id', checkQueryParams, checkCarId(), checkValidationErrrors, checkAuthentication, deleteCarAd, badRequestError);
router.patch('/:car_id/price', checkQueryParams, checkCarADPrice(), checkValidationErrrors, checkAuthentication, changeCarAdPrice, badRequestError);
router.patch('/:car_id/status', checkQueryParams, checkCarADStatus(), checkValidationErrrors, checkAuthentication, changeCarAdStatus, badRequestError);
export default router;
