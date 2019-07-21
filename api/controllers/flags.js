import FlagsModel from '../models/flags';
class Flags {
	static async createFlag(request, response, next) {
		const token = request.token || request.headers.token;
		const { car_id, reason, description } = request.body;
		const parsedCarId = Number(car_id);
		if (
			car_id && reason && token && description
		) {
			const carDatabaseResult = await FlagsModel.postFlag(parsedCarId, reason, description);
			if(carDatabaseResult.rowCount > 0) {
				const data = [...carDatabaseResult.rows];
				return await response.status(200).json({
					status: 200,
					data
				});
			}
		}
		else {
			return await response.status(400).json({
				status: 400,
				error: 'Bad request'
			});
		}
	}
}
export default Flags;
