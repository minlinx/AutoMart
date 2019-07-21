import { validationResult } from 'express-validator/check';
const checkValidationErrors = async (request, response, next) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(422).json({
			status: 422,
			error: errors.array()
		});
	}
	else {
		return await next();
	}
};
export default checkValidationErrors;
