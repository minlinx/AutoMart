import { validationResult } from 'express-validator/check';
import pool from '../../dbConifg';
// import { check } from 'express-validator/check';
class Cars {
	static async getCarOrCars(request, response, next) {
		// const { token } = response.locals;
		// console.log('from me', token);
		const queryParams = request.query;
		// const arrayOfQueryParams = Object.keys(queryParams);
		const queryLength = Object.keys(queryParams).length;
		// const { status, state, min_price, max_price, body_type, manufacturer } = queryParams;
		// const stateIsDefined = arrayOfQueryParams.includes('state');
		// const statusIsDefined = arrayOfQueryParams.includes('status');
		// const manufacturerIsDefined = arrayOfQueryParams.includes('manufacturer', 'status');
		// const bodyTypeIsDefined = arrayOfQueryParams.includes('body_type');
		// const statusAndStateAreDefined = arrayOfQueryParams.includes('state', 'status');
		// const priceRange = arrayOfQueryParams.includes('status', 'min_price', 'max_price');
		if (queryLength === 0) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const sql = 'SELECT * FROM cars';
					return pool.query(sql);
				})
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: 'server is down'
						});
					}
				})
				.then((result) => {
					if (!result.rowCount > 0) {
						return response.status(404).json({
							status: 404,
							error: 'Database is empty'
						});
					}
					else {
						const data = [...result.rows];
						return response.status(200).json({
							status: 200,
							data
						});
					}
				});
		}
		else {
			return response.status(400).json({
				status: 400,
				error: 'Bad Request'
			});
		}
		// else if (priceRange && queryLength === 3) {
		// 	check('status')
		// 		.isLength({ min: 4 })
		// 		.trim().not().isEmpty().isString();
		// 	check('min_price').not().isEmpty().exists().isFloat().trim().escape();
		// 	check('max_price').not().isEmpty().exists().isFloat().trim().escape();
		// 	const errors = validationResult(request);
		// 	if (!errors.isEmpty()) {
		// 		response.status(405).json({
		// 			status: 405,
		// 			error: errors.array()
		// 		});
		// 	}
		// 	else if (errors.isEmpty()) {
		// 		pool.connect()
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(500).json({
		// 						status: 500,
		// 						error: '***server is down***'
		// 					});
		// 				}
		// 			})
		// 			.then(() => {
		// 				const sql = 'SELECT * FROM cars WHERE status=$1 AND price>=$2 AND price<=$3 AND status=$4';
		// 				const param = [status, min_price, max_price, 'available'];
		// 				return pool.query(sql, param);
		// 			})
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(400).json({
		// 						status: 400,
		// 						error: 'Check your inputs'
		// 					});
		// 				}
		// 			})
		// 			.then(result => {
		// 				if (!result.rowCount > 0) {
		// 					return response.status(404).json({
		// 						status: 404,
		// 						error: 'Not Found',
		// 					});
		// 				}
		// 				else {
		// 					const data = [...result.rows];
		// 					return response.status(200).json({
		// 						status: 200,
		// 						data
		// 					});
		// 				}
		// 			});
		// 	}
		// }
		// else if (stateIsDefined && queryLength === 1) {
		// 	check('state')
		// 		.isLength({ min: 3 })
		// 		.trim().not().isEmpty().isString();
		// 	const errors = validationResult(request);
		// 	if (!errors.isEmpty()) {
		// 		response.status(405).json({
		// 			status: 405,
		// 			error: errors.array()
		// 		});
		// 	}
		// 	else if (errors.isEmpty()) {
		// 		pool.connect()
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(500).json({
		// 						status: 500,
		// 						error: 'server is down'
		// 					});
		// 				}
		// 			})
		// 			.then(() => {
		// 				const sql = 'SELECT * FROM cars WHERE (state=$1)  AND (state=$2 OR state=$3) AND status=$4';
		// 				const param = [state, 'new', 'used', 'available'];
		// 				return pool.query(sql, param);
		// 			})
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(400).json({
		// 						status: 400,
		// 						error: 'Check your inputs'
		// 					});
		// 				}
		// 			})
		// 			.then(result => {
		// 				if (!result.rowCount > 0) {
		// 					return response.status(404).json({
		// 						status: 404,
		// 						error: 'Not Found',
		// 					});
		// 				}
		// 				else {
		// 					const data = [...result.rows];
		// 					return response.status(200).json({
		// 						status: 200,
		// 						data
		// 					});
		// 				}
		// 			});
		// 	}
		// }
		// else if (statusIsDefined && queryLength === 1) {
		// 	check('status')
		// 		.isLength({ min: 3 })
		// 		.trim().not().isEmpty().isString();
		// 	const errors = validationResult(request);
		// 	if (!errors.isEmpty()) {
		// 		response.status(405).json({
		// 			status: 405,
		// 			error: errors.array()
		// 		});
		// 	}
		// 	else if (errors.isEmpty()) {
		// 		pool.connect()
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(500).json({
		// 						status: 500,
		// 						error: 'server is down'
		// 					});
		// 				}
		// 			})
		// 			.then(() => {
		// 				const sql = 'SELECT * FROM cars WHERE status=$1';
		// 				const param = [status];
		// 				return pool.query(sql, param);
		// 			})
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(400).json({
		// 						status: 400,
		// 						error: 'Check your inputs'
		// 					});
		// 				}
		// 			})
		// 			.then(result => {
		// 				if (!result.rowCount > 0) {
		// 					return response.status(404).json({
		// 						status: 404,
		// 						error: 'Not Found',
		// 					});
		// 				}
		// 				else {
		// 					const data = [...result.rows];
		// 					return response.status(200).json({
		// 						status: 200,
		// 						data
		// 					});
		// 				}
		// 			});
		// 	}
		// }
		// else if (statusAndStateAreDefined && queryLength === 2) {
		// 	check('status')
		// 		.isLength({ min: 4 })
		// 		.trim().not().isEmpty().isString();
		// 	check('state')
		// 		.isLength({ min: 3 })
		// 		.trim().not().isEmpty().isString();
		// 	const errors = validationResult(request);
		// 	if (!errors.isEmpty()) {
		// 		response.status(405).json({
		// 			status: 405,
		// 			error: errors.array()
		// 		});
		// 	}
		// 	else if (errors.isEmpty()) {
		// 		pool.connect()
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(500).json({
		// 						status: 500,
		// 						error: '***server is down***'
		// 					});
		// 				}
		// 			})
		// 			.then(() => {
		// 				const sql = 'SELECT * FROM cars WHERE (state=$1)  AND status=$2 AND status=$3';
		// 				const param = [state, status, 'available'];
		// 				return pool.query(sql, param);
		// 			})
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(400).json({
		// 						status: 400,
		// 						error: 'Check your inputs'
		// 					});
		// 				}
		// 			})
		// 			.then(result => {
		// 				if (!result.rowCount > 0) {
		// 					return response.status(404).json({
		// 						status: 404,
		// 						error: 'Not Found',
		// 					});
		// 				}
		// 				else {
		// 					const data = [...result.rows];
		// 					return response.status(200).json({
		// 						status: 200,
		// 						data
		// 					});
		// 				}
		// 			});
		// 	}
		// }
		// else if (manufacturerIsDefined && queryLength === 2) {
		// 	check('manufacturer').not().isEmpty()
		// 		.isLength({ min: 4 })
		// 		.trim().isString();
		// 	check('status')
		// 		.isLength({ min: 4 })
		// 		.trim().not().isEmpty().isString();
		// 	const errors = validationResult(request);
		// 	if (!errors.isEmpty()) {
		// 		response.status(405).json({
		// 			status: 405,
		// 			error: errors.array()
		// 		});
		// 	}
		// 	else if (errors.isEmpty()) {
		// 		pool.connect()
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(500).json({
		// 						status: 500,
		// 						error: 'server is down'
		// 					});
		// 				}
		// 			})
		// 			.then(() => {
		// 				const sql = 'SELECT * FROM cars WHERE manufacturer=$1  AND status=$2 AND status=$3';
		// 				const param = [manufacturer, status, 'available'];
		// 				return pool.query(sql, param);
		// 			})
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(400).json({
		// 						status: 400,
		// 						error: 'Check your inputs'
		// 					});
		// 				}
		// 			})
		// 			.then(result => {
		// 				if (!result.rowCount > 0) {
		// 					return response.status(404).json({
		// 						status: 404,
		// 						error: 'Not Found',
		// 					});
		// 				}
		// 				else {
		// 					const data = [...result.rows];
		// 					return response.status(200).json({
		// 						status: 200,
		// 						data
		// 					});
		// 				}
		// 			});
		// 	}
		// }
		// else if (bodyTypeIsDefined && queryLength === 1) {
		// 	check('body_type')
		// 		.isLength({ min: 3 })
		// 		.trim().not().isEmpty().isString();
		// 	const errors = validationResult(request);
		// 	if (!errors.isEmpty()) {
		// 		response.status(405).json({
		// 			status: 405,
		// 			error: errors.array()
		// 		});
		// 	}
		// 	else if (errors.isEmpty()) {
		// 		pool.connect()
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(500).json({
		// 						status: 500,
		// 						error: 'server is down'
		// 					});
		// 				}
		// 			})
		// 			.then(() => {
		// 				const sql = 'SELECT * FROM cars WHERE body_type=$1  AND status=$2';
		// 				const param = [body_type, 'available'];
		// 				return pool.query(sql, param);
		// 			})
		// 			.catch(error => {
		// 				if (error) {
		// 					return response.status(400).json({
		// 						status: 400,
		// 						error: 'Check your inputs'
		// 					});
		// 				}
		// 			})
		// 			.then(result => {
		// 				if (!result.rowCount > 0) {
		// 					return response.status(404).json({
		// 						status: 404,
		// 						error: 'Not Found',
		// 					});
		// 				}
		// 				else {
		// 					const data = [...result.rows];
		// 					return response.status(200).json({
		// 						status: 200,
		// 						data
		// 					});
		// 				}
		// 			});
		// 	}
		// }
	}
	static async specificCar(request, response, next) {
		// const { token } = response.locals;
		const queryLength = parseInt(Object.keys(request.query).length);
		const { car_id } = request.params;
		const parsedCarId = parseInt(car_id, 10);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(405).json({
				status: 405,
				error: errors.array()
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (car_id) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: 'server is down'
						});
					}
				})
				.then(() => {
					const sql = 'SELECT * FROM cars WHERE id=$1';
					const param = [parsedCarId];
					return pool.query(sql, param);
				})
				.catch(error => {
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
						const data = { ...result.rows[0] };
						return response.status(200).json({
							status: 200,
							data
						});
					}
				});
		}
		else {
			return response.status(405).json({
				status: 405,
				error: 'wait a minute'
			});
		}
	}
	static async postCarAd(request, response, next) {
		const { id } = response.locals;
		const queryLength = parseInt(Object.keys(request.query).length);
		const {
			token,
			status,
			manufacturer,
			model,
			body_type,
			price,
			state
		} = request.body;
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(405).json({
				status: 405,
				error: errors.array()
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (
			manufacturer &&
			model &&
			body_type &&
			price &&
			state &&
			status &&
			token &&
			errors.isEmpty()
		) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const createdOn = new Date();
					// const url = (request.file.secure_url);
					const url = 'https://res.cloudinary.com/min-automart/image/upload/v1562696499/min-automart-images/1562696490671car4.jpg.jpg';
					const sql = 'INSERT INTO cars (owner, created_on, state, status, price, manufacturer, model, body_type, car_image) VALUES ((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
					const params = [id, createdOn, state, status, price, manufacturer, model, body_type, url];
					return pool.query(sql, params);
				})
				.catch(error => {
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
						const data = { ...result.rows[0], token };
						return response.status(201).json({
							status: 201,
							data
						});
					}
				});
		}
	}
	static async deleteCarAd(request, response, next) {
		// const { adminToken } = response.locals;
		// const { token } = request.body;
		const queryLength = parseInt(Object.keys(request.query).length);
		const { car_id } = request.params;
		const parsedCarId = parseInt(car_id, 10);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(405).json({
				status: 405,
				error: errors.array()
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (
			car_id
		) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const sql = 'DELETE FROM cars WHERE id=$1';
					const param = [parsedCarId];
					return pool.query(sql, param);
				})
				.catch(error => {
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
						return response.status(301).json({
							status: 301,
							data: 'Car Ad successfully deleted'
						});
					}
				});
		}
		else {
			return response.status(405).json({
				status: 405,
				error: 'Unauthorized'
			});
		}
	}
	static async changeCarAdPrice(request, response, next) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const { price, token } = request.body;
		const { id } = response.locals;
		const { car_id } = request.params;
		const parsedPrice = parseFloat(price);
		const parsedCarId = parseInt(car_id);
		if (!errors.isEmpty()) {
			return response.status(405).json({
				status: 405,
				error: errors.array()
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (
			token
		) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const sql = 'UPDATE cars SET price=$1 WHERE id=$2 AND owner=(SELECT id FROM users WHERE id=$3) RETURNING *';
					const param = [parsedPrice, parsedCarId, id];
					return pool.query(sql, param);
				})
				.catch(error => {
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
						const data = { ...result.rows[0], token };
						return response.status(202).json({
							status: 202,
							data
						});
					}
				});
		}
		else {
			response.status(400).json({
				status: 400,
				error: 'Bad Request'
			});
		}
	}
	static async changeCarAdStatus(request, response, next) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const { token, status } = request.body;
		const { id } = response.locals;
		const { car_id } = request.params;
		const parsedCarId = parseInt(car_id);
		if (!errors.isEmpty()) {
			return response.status(405).json({
				status: 405,
				error: errors.array()
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (
			token && status === 'sold'
		) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const sql = 'UPDATE cars SET status=$1 WHERE id=$2 AND owner=(SELECT id FROM users WHERE id=$3) RETURNING *';
					const param = ['sold', parsedCarId, id];
					return pool.query(sql, param);
				})
				.catch(error => {
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
						const data = { ...result.rows[0], token };
						return response.status(202).json({
							status: 202,
							data
						});
					}
				});
		}
		else {
			return response.status(400).json({
				status: 405,
				error: 'Bad Request'
			});
		}
	}
}
export default Cars;
