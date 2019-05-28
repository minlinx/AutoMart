import jwt from 'jsonwebtoken';
const privateKey = process.env.JWT_PRIVATE_KEY;
function checkUserAuthentication(request, response, next) {
	try {
		const token = request.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, privateKey);
		console.log(decodedToken);
		next();
	} catch (param) {
		response.status(401).json({
			status: 401,
			error: 'Authentication failed'
		});
	}
}
export default checkUserAuthentication;
