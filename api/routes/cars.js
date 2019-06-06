import express from 'express';
// import validator from '../../middlewares/getRouteHandler';
// import imageParser from '../../middlewares/uploadImage';
import Cars from '../controllers/cars';

// const {
// 	postCarAdValidator,
// 	checkCarId,
// 	checkStatus,
// 	checkBodyType,
// 	checkStatusAndState,
// 	checkStatusMinPriceAndMaxPrice,
// 	checkCarADStatus,
// 	checkCarADPrice
// } = validator;
const {
	// getAllCars,
	// getCarsWithStatus,
	// getCarsWithBodyType,
	// getCarsWithStatusAndState,
	getCarOrCars
	// specificCar,
	// postCarAd,
	// deleteCarAd,
	// changeCarAdPrice,
	// changeCarAdStatus
} = Cars;
const router = express.Router();
// router.post('/status', checkStatus(), getCarsWithStatus);
// router.post('/bodyType', checkBodyType(), getCarsWithBodyType);
router.get(
	'/',
	getCarOrCars
);
// router.post('/statusAndState', checkStatusAndState(), getCarsWithStatusAndState);
// router.get('/:carId', checkCarId(), specificCar);
// router.post(
// 	'/',
// 	imageParser.single('carImage'),
// 	postCarAdValidator(),
// 	postCarAd
// );
// router.delete('/:carId', checkCarId(), deleteCarAd);
// router.patch('/:carId/price', checkCarADPrice(), changeCarAdPrice);
// router.patch('/:carId/status', checkCarADStatus(), changeCarAdStatus);
export default router;
