import { check } from 'express-validator/check';
class GetRouteValidator {
	static checkCarId() {
		return [
			check('carId').not().isEmpty().exists().isInt().trim().escape()
		];
	}
	static postCarAdValidator() {
		return [
			check('id').not().isEmpty().exists().isInt().trim().escape(),
			check('owner').not().isEmpty().exists().isInt().trim(),
			check('email').not().isEmpty().exists().isEmail().escape(),
			check('price').not().isEmpty().exists().isFloat().trim().escape(),
			check('status').not().isEmpty().exists().isString().trim().escape().withMessage('status should be AVAILABLE or SOLD'),
			check('state').not().isEmpty().exists().isString().trim().escape().withMessage('state should be new 0r used'),
			check('manufacturer').not().isEmpty().exists().isString().trim().escape(),
			check('model').not().isEmpty().exists().isString().trim().escape(),
			check('bodyType').not().isEmpty().exists().isString().trim().escape(),
		];
	}
	static checkCarADStatus() {
		return [
			check('carId').not().isEmpty().exists().isInt().trim().escape(),
			check('status').not().isEmpty().exists().isString().trim().escape()
		];
	}
	static checkCarADPrice() {
		return [
			check('carId').not().isEmpty().exists().isInt().trim().escape(),
			check('price').not().isEmpty().exists().isFloat().trim().escape()
		];
	}
	static createOrderValidator() {
		return [
			check('carId').not().isEmpty().exists().isInt().trim().escape(),
			check('priceOffered').not().isEmpty().exists().isFloat().trim().escape()
		];
	}
	static updateOrderValidator() {
		return [
			check('orderId').not().isEmpty().exists().isInt().trim().escape(),
			check('priceOffered').not().isEmpty().exists().isFloat().trim().escape()
		];
	}
	static signUpValidator() {
		return [
			check('email').not().isEmpty().exists().isEmail().escape(),
			check('password').not().isEmpty().exists().isString().trim().escape()
		];
	}
}
export default GetRouteValidator;
