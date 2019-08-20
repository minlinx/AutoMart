/**
 *
 * @param {HttpServerRequest} request
 * @param {ServerResponse} response
 * @param {number} status
 * @param {Object} data
 *
 */
const serverResponse = async (request, response, status, data = 'Not Found') => {
	return await response.status(status).json({
		status,
		data
	});
};
export default serverResponse;
