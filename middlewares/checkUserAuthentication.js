import jwt from 'jsonwebtoken';
const privateKey = process.env.JWT_PRIVATE_KEY;
function checkUserAuthentication(request, response, next) {
	const bearerToken = request.headers.authorization;
	try {
		if (bearerToken) {
			const token = bearerToken.split(' ')[1];
			const decodedToken = jwt.verify(token, privateKey);
			const { email } = decodedToken;
			const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(automart)\.com$/g;
			const isAdmin = regex.test(email);
			if (isAdmin) {
				response.locals.adminToken = token;
				response.locals.userEmail = email;
				next();
			}
			else {
				response.locals.userToken = token;
				response.locals.userEmail = email;
				next();
			}
		}
		else {
			response.status(422).json({
				status: 422,
				error: 'No Token Provided'
			});
		}
	} catch (param) {
		response.status(401).json({
			status: 401,
			error: 'Authentication Failed',
		});
	}
}
export default checkUserAuthentication;
