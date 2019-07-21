const checkQueryParams = async (request, response, next) => {
	const queryLength = parseInt(Object.keys(request.query).length);
	if(queryLength > 0) {
		return await response.status(400).json({
			status: 400,
			error: 'No Query Params'
		});
	}
	else {
		return await next();
	}
};
export default checkQueryParams;
