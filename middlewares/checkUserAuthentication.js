import jwt from 'jsonwebtoken';
const privateKey = process.env.JWT_PRIVATE_KEY || 'automart';
function checkUserAuthentication(request, response, next) {
	try {
		const bearerToken = request.headers.authorization;
		const token = bearerToken.split(' ')[1];
		const headersToken = token || request.headers.token || request.body.token;
		const decodedToken = jwt.verify(headersToken, privateKey);
		if (!decodedToken) {
			return response.status(401).json({
				status: 401,
				error: 'Unauthorized'
			});
		}
		else {
			request.user = decodedToken;
			request.token = headersToken;
			return next();
		}
	} catch (error) {
		console.log('checkauth error', error);
		return response.status(401).json({
			status: 401,
			error: 'Authentication Failed'
		});
	}
}
export default checkUserAuthentication;
