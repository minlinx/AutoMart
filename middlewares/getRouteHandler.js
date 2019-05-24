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
}
export default GetRouteValidator;
