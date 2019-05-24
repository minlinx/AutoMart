import { check } from 'express-validator/check';
class GetRouteValidator {
	static checkStatusAndState() {
		return [
			check('status', 'status is required')
				.isLength({ min: 5 })
				.trim().isEmpty().isString(),
			check('state', 'state is required')
				.isLength({ min: 3 })
				.trim().isEmpty().isString()
		];
	}
	static postCarAdValidator() {
		return [
			check('owner').not().isEmpty().exists().isString().trim().escape(),
			check('email').not().isEmpty().exists().isEmail().escape(),
			check('createdOn').not().isEmpty().escape().withMessage('Put in todays date'),
			check('price').not().isEmpty().exists().isFloat().trim().escape(),
			check('status').not().isEmpty().exists().isString().trim().escape().withMessage('status should be AVAILABLE or SOLD'),
			check('manufacturer').not().isEmpty().exists().isString().trim().escape(),
			check('model').not().isEmpty().exists().isString().trim().escape(),
			check('bodyType').not().isEmpty().exists().isString().trim().escape(),
			check('carImage').not().isEmpty().exists().isString().trim().escape()
		];
	}
	static createOrderValidator() {
		return [
			check('carId').not().isEmpty().exists().isInt().trim().escape(),
			check('priceOffered').not().isEmpty().exists().isFloat().trim().escape()];
	}
}
export default GetRouteValidator;
