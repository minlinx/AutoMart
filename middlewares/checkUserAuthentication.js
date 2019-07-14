import jwt from 'jsonwebtoken';
const privateKey = process.env.JWT_PRIVATE_KEY || 'automart';
function checkUserAuthentication(request, response, next) {
	// console.log(request.headers);
	// const bearerToken = request.headers.authorization;
	const { token } = request.headers;
	const bodyToken = request.body;
	if (token) {
		// const token = bearerToken.split(' ')[1];
		const decodedToken = jwt.verify(token, privateKey);
		const { email, id } = decodedToken;
		const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(automart)\.com$/g;
		const isAdmin = regex.test(email);
		if (isAdmin) {
			response.locals.adminToken = token;
			response.locals.adminEmail = email;
			response.locals.adminId = id;
			next();
		}
		else {
			response.locals.token = token;
			response.locals.email = email;
			response.locals.id = id;
			next();
		}
	}
	else if (bodyToken) {
		// const token = bearerToken.split(' ')[1];
		const decodedToken = jwt.verify(token, privateKey);
		const { email, id } = decodedToken;
		const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(automart)\.com$/g;
		const isAdmin = regex.test(email);
		if (isAdmin) {
			response.locals.adminToken = token;
			response.locals.adminEmail = email;
			response.locals.adminId = id;
			next();
		}
		else {
			response.locals.token = token;
			response.locals.email = email;
			response.locals.id = id;
			next();
		}
	}
	// else if (bearerToken) {
	// 	const token = bearerToken.split(' ')[1];
	// 	const decodedToken = jwt.verify(token, privateKey);
	// 	const { email, id } = decodedToken;
	// 	const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(automart)\.com$/g;
	// 	const isAdmin = regex.test(email);
	// 	if (isAdmin) {
	// 		response.locals.adminToken = token;
	// 		response.locals.adminEmail = email;
	// 		response.locals.adminId = id;
	// 		next();
	// 	}
	// 	else {
	// 		response.locals.token = token;
	// 		response.locals.email = email;
	// 		response.locals.id = id;
	// 		next();
	// 	}
	// }
	else {
		response.status(403).json({
			status: 403,
			error: 'No Token Provided'
		});
	}
}
export default checkUserAuthentication;
