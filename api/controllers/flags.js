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
				return await response.status(201).json({
					status: 201,
					data
				});
			}
		}
		else {
			return await next();
		}
	}
}
export default Flags;
