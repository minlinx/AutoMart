class apiEror {
	static notFoundError(request, response, next) {
		const error = new Error('Not Found, check the URL you typed and try again');
		error.status = 404 || 500;
		return next(error);
	}
	static serverError(error, request, response, next) {
		if (error.status === 404) {
			return response.status(404).json({
				status: 404,
				error: error.message
			});
		}
		else {
			return response.status(500).json({
				status: 500,
				error: 'Oops!!! Server is down, Try again later'
			});
		}
	}
}
export default apiEror;
