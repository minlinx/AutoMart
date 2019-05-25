import jwt from 'jsonwebtoken';
function checkUserAuthentication(request, response, next) {
	try {
		const token = request.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'autoMart@minlinx2019');
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
