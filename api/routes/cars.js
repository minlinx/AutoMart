import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import checkAuthentication from '../../middlewares/checkUserAuthentication';
// import imageParser from '../../middlewares/uploadImage';
import Cars from '../controllers/cars';

const {
	postCarAdValidator,
	// checkCarId,
	checkCarADStatus,
	checkCarADPrice
} = validator;
const {
	// getCarOrCars,
	// specificCar,
	postCarAd,
	// deleteCarAd,
	changeCarAdPrice,
	changeCarAdStatus
} = Cars;
const router = express.Router();
// router.get(
// 	'/',
// 	checkAuthentication,
// 	getCarOrCars
// );
// router.get('/:car_id', checkAuthentication, specificCar);
router.post(
	'/',
	checkAuthentication,
	// imageParser.single('car_image'),
	postCarAdValidator(),
	postCarAd
);
// router.delete('/:car_id', checkCarId(), checkAuthentication, deleteCarAd);
router.patch('/:car_id/price', checkCarADPrice(), checkAuthentication, changeCarAdPrice);
router.patch('/:car_id/status', checkCarADStatus(), checkAuthentication, changeCarAdStatus);
export default router;
