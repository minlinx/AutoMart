class apiEror {
	static notFoundError(request, response, next) {
		const error = new Error('Not Found');
		error.status = 404 || 500;
		next(error);
	}
	static serverError(error, request, response, next) {
		if (error.status === 404) {
			response.status(404).json({
				status: 404,
				error: error.message
			});
		}
		response.status(500).json({
			status: 500,
			error: 'Try again later'
		});
	}
}
export default apiEror;
