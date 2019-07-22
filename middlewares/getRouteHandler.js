import { check } from 'express-validator/check';
class GetRouteValidator {
	static checkCarId() {
		return [
			check('car_id').not().isEmpty().exists().isInt().trim().escape().withMessage({
				note: 'car_id MUST be a number',
				example: 1
			})
		];
	}
	static postCarAdValidator() {
		return [
			check('price').not().isEmpty().exists().isFloat().trim().escape().withMessage({
				note: 'price MUST be a number',
				example: 300000000
			}),
			check('state').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'state MUST be an english word',
				example: 'used, new'
			}),
			check('status').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'status MUST be an english word',
				example: 'available, sold'
			}),
			check('manufacturer').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'manufacturer MUST be an english word',
				example: 'honda, benz, bmw, volks wagen, etc'
			}),
			check('model').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'model MUST be an english word',
				example: 'bmw-2019, 2019-honda-kkk'
			}),
			check('body_type').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'body_type MUST be an english word',
				example: 'van, car, truck, trailer, bus, etc'
			}),
		];
	}
	static checkCarADStatus() {
		return [
			check('status').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'status MUST be an english word',
				example: 'available, sold'
			}),
			check('car_id').not().isEmpty().exists().isInt().trim().escape().withMessage({
				note: 'car_id MUST be a number',
				example: 1
			})
		];
	}
	static checkCarADPrice() {
		return [
			check('price').not().isEmpty().exists().isFloat().trim().escape().withMessage({
				note: 'price MUST be a number',
				example: 300000000
			}),
			check('car_id').not().isEmpty().exists().isInt().trim().escape().withMessage({
				note: 'car_id MUST be a number',
				example: 1
			})
		];
	}
	static createOrderValidator() {
		return [
			check('car_id').not().isEmpty().exists().isInt().trim().escape().withMessage({
				note: 'car_id MUST be a number',
				example: 1
			}),
			check('amount').not().isEmpty().exists().isInt().trim().escape().withMessage({
				note: 'amount MUST be a number',
				example: 300000000
			})
		];
	}
	static updateOrderValidator() {
		return [
			check('order_id').not().isEmpty().exists().isInt().trim().escape().withMessage({
				note: 'order_id MUST be a number',
				example: 1
			}),
			check('price').not().isEmpty().exists().isFloat().trim().escape().withMessage({
				note: 'price MUST be a number',
				example: 300000000
			}),
		];
	}
	static signUpValidator() {
		return [
			check('email').not().isEmpty().exists().isEmail().escape().withMessage({
				note: 'use a valid email address',
				example: 'minlinx@automart.com'
			}),
			check('password').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'password can be a set of letters, special characters, numbers, or a combination',
				example: 'frxxxxxxz, 78666000, uyvvv87688, ***78yttt***'
			}),
			check('first_name').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'Your first name',
				example: 'mba, joe, ben'
			}),
			check('last_name').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'Your last name',
				example: 'ifeanyi, nelson, hamster'
			}),
			check('address').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'The place you reside in',
				example: 'No. 8 george odugwu street, era, ijanikin, otto-awori, lagos'
			}),
		];
	}
	static flagValidator() {
		return [
			check('reason').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'the reason why you are flgging the Ad',
				example: 'the vehicle is expensive'
			}),
			check('description').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'describe the reason why you are flgging the Ad',
				example: 'I compared prices of the vehicle on this site to prices of the vehicle on another sites, ...is expensive'
			}),
			check('car_id').not().isEmpty().exists().isInt().trim().escape().withMessage({
				note: 'car_id MUST be a number',
				example: 1
			})
		];
	}
	static signInValidator() {
		return [
			check('email').not().isEmpty().exists().isEmail().escape().withMessage({
				note: 'use a valid email address',
				example: 'minlinx@automart.com'
			}),
			check('password').not().isEmpty().exists().isString().trim().escape().withMessage({
				note: 'password can be a set of letters, special characters, numbers, or a combination',
				example: 'frxxxxxxz, 78666000, uyvvv87688, ***78yttt***'
			})
		];
	}
}
export default GetRouteValidator;
