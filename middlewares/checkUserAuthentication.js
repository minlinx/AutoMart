import jwt from 'jsonwebtoken';
const privateKey = process.env.JWT_PRIVATE_KEY || 'automart';
function checkUserAuthentication(request, response, next) {
	const headersToken = request.headers.token;
	if (headersToken) {
		const decodedToken = jwt.verify(headersToken, privateKey);
		if (!decodedToken) {
			return response.status(401).json({
				status: 401,
				error: 'Unauthorized'
			});
		}
		request.user = decodedToken;
		return next();
	}
	else {
		response.status(401).json({
			status: 401,
			error: 'No Token Provided'
		});
		return next();
	}
}
export default checkUserAuthentication;
