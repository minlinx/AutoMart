const checkContentType = async (request, response, next) => {
	const requestType1 = request.get('Content-Type');
	const requestType = requestType1.split(';')[0];
	console.log(requestType);
	if(requestType == 'multipart/form-data') {
		return await next();
	}
	else {
		return response.status(400).json('bad request');
	}
};
export default checkContentType;
