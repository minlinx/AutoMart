import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import imageParser from '../../middlewares/uploadImage';
import Cars from '../controllers/cars';

const { postCarAdValidator, checkStatusAndState } = validator;
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
router.get('/status', getCarsWithStatus);
router.get('/bodyType', getCarsWithBodyType);
router.get('/priceRane', getCarsWithinAPriceRance);
router.get('/', getAllCars);
router.get(
	'/statusAndState',
	checkStatusAndState(),
	getCarsWithStatusAndState
);
router.get('/:carId', specificCar);
router.post('/', imageParser.single('vehicleImage'), postCarAdValidator(), postCarAd);
router.delete('/:carId', deleteCarAd);
router.patch('/:carId/:param', changeAdPriceOrStatus);
export default router;
