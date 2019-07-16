import jwt from 'jsonwebtoken';
const privateKey = process.env.JWT_PRIVATE_KEY || 'automart';
function checkUserAuthentication(request, response, next) {
	const bearerToken = request.headers.bearerToken;
	const token = bearerToken.split(' ')[1];
	const headersToken = request.headers.token || request.body.token || token;
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
}
export default checkUserAuthentication;
