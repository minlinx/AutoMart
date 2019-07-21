const BadRequestError = async (request, response) => {
	return await response.status(400).json({
		status: 400,
		error: 'Bad Request'
	});
};
export default BadRequestError;
