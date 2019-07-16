class apiEror {
	static notFoundError(request, response, next) {
		const error = new Error('Not Found, check the URL you typed and try again');
		console.log('From apierrormiddleware', error);
		error.status = 404 || 500;
		return next(error);
	}
	static serverError(error, request, response, next) {
		if (error.status === 404) {
			console.log('From apierrormiddleware', error);
			return response.status(404).json({
				status: 404,
				error: error.message
			});
		}
		else {
			console.log('From apierrormiddleware', error);
			return response.status(500).json({
				status: 500,
				error: 'Oops!!! Server is down, Try again later'
			});
		}
	}
}
export default apiEror;
