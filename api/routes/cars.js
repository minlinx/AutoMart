import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import imageParser from '../../middlewares/uploadImage';
import Cars from '../controllers/cars';

const {
	postCarAdValidator,
	checkCarId,
	checkStatus,
	checkBodyType,
	checkStatusAndState,
	checkStatusMinPriceAndMaxPrice,
	modifyCarAdValidator
} = validator;
const {
	getAllCars,
	getCarsWithStatus,
	getCarsWithBodyType,
	getCarsWithStatusAndState,
	getCarsWithinAPriceRance,
	specificCar,
	postCarAd,
	deleteCarAd,
	changeAdPriceOrStatus
} = Cars;
const router = express.Router();
router.param('status', (request, response, next) => {
	next();
});
router.param('bodyType', (request, response, next) => {
	next();
});
router.param('statusAndState', (request, response, next) => {
	next();
});
router.param('priceRane', (request, response, next) => {
	next();
});
router.get('/status', checkStatus(), getCarsWithStatus);
router.get('/bodyType', checkBodyType(), getCarsWithBodyType);
router.get(
	'/priceRange',
	checkStatusMinPriceAndMaxPrice(),
	getCarsWithinAPriceRance
);
router.get('/', getAllCars);
router.get('/statusAndState', checkStatusAndState(), getCarsWithStatusAndState);
router.get('/:carId', checkCarId(), specificCar);
router.post(
	'/',
	imageParser.single('vehicleImage'),
	postCarAdValidator(),
	postCarAd
);
router.delete('/:carId', checkCarId(), deleteCarAd);
router.patch('/:carId/:param', modifyCarAdValidator(), changeAdPriceOrStatus);
export default router;
