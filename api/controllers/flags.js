import { validationResult } from 'express-validator/check';
import pool from '../../dbConifg';

class Flags {
	static async createFlag(request, response, next) {
		const token = request.token || request.headers.token;
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const { car_id, reason, description } = request.body;
		const parsedCarId = Number(car_id);
		if (!errors.isEmpty()) {
			return response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (
			car_id && reason && token && description
		) {
			pool.connect()
				.catch(error => {
					console.log('From create flags', error);
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const createdOn = new Date();
					const sql = 'INSERT INTO flags(car_id, created_on, reason, description) VALUES ($1, $2, $3, $4) RETURNING *';
					const params = [parsedCarId, createdOn, reason, description];
					return pool.query(sql, params);
				})
				.catch(error => {
					console.log('From create flag', error);
					if (error) {
						return response.status(400).json({
							status: 400,
							error: 'Check your inputs'
						});
					}
				})
				.then(result => {
					if (!result.rowCount > 0) {
						return response.status(404).json({
							status: 404,
							error: 'Not Found',
						});
					}
					else {
						const { data } = result.rows[0];
						console.log('create flag', data);
						return response.status(201).json({
							status: 201,
							data
						});
					}
				});
		}
		else {
			return response.status(400).json({
				status: 400,
				error: 'Bad request'
			});
		}
	}
}
export default Flags;
