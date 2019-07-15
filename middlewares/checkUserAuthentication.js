import jwt from 'jsonwebtoken';
const privateKey = process.env.JWT_PRIVATE_KEY || 'automart';
function checkUserAuthentication(request, response, next) {
	// console.log(request.headers);
	const bearerToken = request.headers.authorization;
	const { token } = request.body;
	const headersToken  = request.headers.token;
	// const bodyToken = request.body;
	if (headersToken) {
		// const token = bearerToken.split(' ')[1];
		const decodedToken = jwt.verify(headersToken, privateKey);
		const { email, id } = decodedToken;
		const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(automart)\.com$/g;
		const isAdmin = regex.test(email);
		if (isAdmin) {
			response.locals.token = token;
			response.locals.adminEmail = email;
			response.locals.adminId = id;
			return next();
		}
		else {
			response.locals.token = token;
			response.locals.email = email;
			response.locals.id = id;
			return next();
		}
	}
	else if (token) {
		// const token = bearerToken.split(' ')[1];
		const decodedToken = jwt.verify(token, privateKey);
		const { email, id } = decodedToken;
		const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(automart)\.com$/g;
		const isAdmin = regex.test(email);
		if (isAdmin) {
			response.locals.token = token;
			response.locals.adminEmail = email;
			response.locals.adminId = id;
			return next();
		}
		else {
			response.locals.token = token;
			response.locals.email = email;
			response.locals.id = id;
			return next();
		}
	}
	else if (bearerToken) {
		const token = bearerToken.split(' ')[1];
		const decodedToken = jwt.verify(token, privateKey);
		const { email, id } = decodedToken;
		const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(automart)\.com$/g;
		const isAdmin = regex.test(email);
		if (isAdmin) {
			response.locals.token = token;
			response.locals.adminEmail = email;
			response.locals.adminId = id;
			return next();
		}
		else {
			response.locals.token = token;
			response.locals.email = email;
			response.locals.id = id;
			return next();
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
		response.status(401).json({
			status: 401,
			error: 'No Token Provided'
		});
	}
}
export default checkUserAuthentication;
