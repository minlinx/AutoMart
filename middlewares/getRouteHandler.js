import { check } from 'express-validator/check';
class GetRouteValidator {
	static checkCarId() {
		return [
			check('car_id').not().isEmpty().exists().isInt().trim().escape()
		];
	}
	static postCarAdValidator() {
		return [
			check('email').not().isEmpty().exists().isEmail().escape(),
			check('price').not().isEmpty().exists().isFloat().trim().escape(),
			check('state').not().isEmpty().exists().isString().trim().escape().withMessage('state should be new 0r used'),
			check('manufacturer').not().isEmpty().exists().isString().trim().escape(),
			check('model').not().isEmpty().exists().isString().trim().escape(),
			check('body_type').not().isEmpty().exists().isString().trim().escape(),
		];
	}
	static checkCarADStatus() {
		return [
			check('car_id').not().isEmpty().exists().isInt().trim().escape(),
			check('email').not().isEmpty().exists().isEmail().escape(),
			check('status').not().isEmpty().exists().isString().trim().escape()
		];
	}
	static checkCarADPrice() {
		return [
			check('car_id').not().isEmpty().exists().isInt().trim().escape(),
			check('email').not().isEmpty().exists().isEmail().escape(),
			check('price').not().isEmpty().exists().isFloat().trim().escape()
		];
	}
	static createOrderValidator() {
		return [
			check('email').not().isEmpty().exists().isEmail().escape(),
			check('car_id').not().isEmpty().exists().isInt().trim().escape(),
			check('price_offered').not().isEmpty().exists().isFloat().trim().escape()
		];
	}
	static updateOrderValidator() {
		return [
			check('order_id').not().isEmpty().exists().isInt().trim().escape(),
			check('email').not().isEmpty().exists().isEmail().escape(),
			check('price_offered').not().isEmpty().exists().isFloat().trim().escape()
		];
	}
	static signUpValidator() {
		return [
			check('email').not().isEmpty().exists().isEmail().escape(),
			check('password').not().isEmpty().exists().isString().trim().escape(),
			check('first_name').not().isEmpty().exists().isString().trim().escape(),
			check('last_name').not().isEmpty().exists().isString().trim().escape(),
			check('address').not().isEmpty().exists().isString().trim().escape()
		];
	}
	static signInValidator() {
		return [
			check('email').not().isEmpty().exists().isEmail().escape(),
			check('password').not().isEmpty().exists().isString().trim().escape()
		];
	}
}
export default GetRouteValidator;
