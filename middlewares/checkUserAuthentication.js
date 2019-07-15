import jwt from 'jsonwebtoken';
const privateKey = process.env.JWT_PRIVATE_KEY || 'automart';
function checkUserAuthentication(request, response, next) {
	const bearerToken = request.headers.authorization;
	const { token } = request.body;
	const headersToken = request.headers.token;
	if (headersToken) {
		// const token = bearerToken.split(' ')[1];
		const decodedToken = jwt.verify(headersToken, privateKey);
		if (!decodedToken) {
			return response.status(401).json({
				status: 401,
				error: 'Unauthorized'
			});
		}
		else {
			const { email, id } = decodedToken;
			response.locals.token = headersToken;
			response.locals.email = email;
			response.locals.id = id;
			return next();
		}
	}
	else if (token) {
		const decodedToken = jwt.verify(token, privateKey);
		if (!decodedToken) {
			return response.status(401).json({
				status: 401,
				error: 'Unauthorized'
			});
		}
		else {
			const { email, id } = decodedToken;
			response.locals.token = token;
			response.locals.email = email;
			response.locals.id = id;
			return next();
		}
	}
	else if (bearerToken) {
		const token1 = bearerToken.split(' ')[1];
		const decodedToken = jwt.verify(token1, privateKey);
		if (!decodedToken) {
			return response.status(401).json({
				status: 401,
				error: 'Unauthorized'
			});
		}
		else {
			const { email, id } = decodedToken;
			response.locals.token = token1;
			response.locals.email = email;
			response.locals.id = id;
			return next();
		}
	}
	else {
		response.status(401).json({
			status: 401,
			error: 'No Token Provided'
		});
	}
}
export default checkUserAuthentication;
