import jwt from 'jsonwebtoken';
const privateKey = process.env.JWT_PRIVATE_KEY || 'automart';
function checkUserAuthentication(request, response, next) {
	const bearerToken = request.headers.authorization;
	const { token } = request.body;
	const headersToken = request.headers.token;
	if (headersToken) {
		// const token = bearerToken.split(' ')[1];
		const decodedToken = jwt.verify(token, privateKey);
		const { email, id } = decodedToken;
		const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(automart)\.com$/g;
		const isAdmin = regex.test(email);
		if (isAdmin) {
			response.locals.adminToken = headersToken;
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
	else if (token) {
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
	else if (bearerToken) {
		const token = bearerToken.split(' ')[1];
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
	else {
		response.status(422).json({
			status: 422,
			error: 'No Token Provided'
		});
	}
}
export default checkUserAuthentication;
