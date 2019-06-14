import jwt from 'jsonwebtoken';
import pool from '../../dbConifg';
// import usersDB from '../models/users';
import { validationResult } from 'express-validator/check';
const privateKey = process.env.JWT_PRIVATE_KEY;
class Users {
	// static signUpFunction(request, response) {
	// 	const { email, password } = request.body;
	// 	const hashedPassword = parseInt(password, 36);
	// 	const vehicleOwner = usersDB.find((user) => user.email === email);
	// 	const errors = validationResult(request);
	// 	if (!errors.isEmpty()) {
	// 		response.status(422).json({
	// 			status: 422,
	// 			error: errors.array()
	// 		});
	// 	}
	// 	if (errors.isEmpty() && vehicleOwner) {
	// 		const { firstName } = vehicleOwner;
	// 		const url = request.route.path.toString();
	// 		const token = jwt.sign(
	// 			{
	// 				email,
	// 				firstName
	// 			},
	// 			privateKey
	// 		);
	// 		if (url === '/signup') {
	// 			const newId = usersDB.length + 1;
	// 			const data = { token, hashedPassword, ...vehicleOwner, id: newId };
	// 			response.status(201).json({
	// 				status: 201,
	// 				data
	// 			});
	// 		}
	// 		const verifiedToken = response.locals.token;
	// 		const data = { token: verifiedToken, ...vehicleOwner };
	// 		response.status(200).json({
	// 			status: 200,
	// 			data
	// 		});
	// 	}
	// }
	static signUpFunction(request, response) {
		const { email, password } = request.body;
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array(),
				message: 'programming requires consistency Everytime'
			});
		}
		if (errors.isEmpty()) {
			pool.connect()
				.catch(error => console.error(error))
				.then(() => {
					const sql = 'SELECT * FROM users WHERE email=$1';
					const param = [email];
					return pool.query(sql, param);
				})
				.catch(error => console.error(error))
				.then(result => {
					if (result.rowCount > 0) {
						console.log(password);
						return response.status(400).json({
							status: 400,
							message: 'Sign in instead',
						});
					}
					const sql = 'INSERT INTO users (email, password)  VALUES($1, $2)';
					const params = [email, password];
					return pool.query(sql, params);
				})
				.catch((error) => console.log(error))
				.then((result) => {
					if (result.rowCount > 0) {
						const token = jwt.sign(
							{
								email
							},
							privateKey
						);
						const data = { token, email };
						response.status(201).json({
							status: 201,
							data
						});
					}
					response.send('somethhing');
					pool.end();
				});
		}
	}
	static signInFunction(request, response) {
		const { email, password } = request.body;
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if(errors.isEmpty()) {
			pool.connect()
				.catch(error => console.error('err1', password, error))
				.then(() => {
					const sql = 'SELECT * FROM users WHERE email=$1';
					const param = [email];
					return pool.query(sql, param);
				})
				.catch((error) => console.log('err2', error))
				.then((result) => {
					if (!result.rowCount > 0) {
						response.status(400).json({
							status: 400,
							error: 'Sign Up Instead'
						});
					}
					const token = response.locals.token;
					const data = { token, email };
					response.status(200).json({
						status: 200,
						data
					});
				}).catch((error) => console.log(error));
		}
	}
}
export default Users;
