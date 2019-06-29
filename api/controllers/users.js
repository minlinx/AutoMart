import jwt from 'jsonwebtoken';
import pool from '../../dbConifg';
import { validationResult } from 'express-validator/check';
const privateKey = process.env.JWT_PRIVATE_KEY || 'automart';
class Users {
	static signUpFunction(request, response) {
		const queryParams = request.query;
		const queryLength = Object.keys(queryParams).length;
		const { email, password } = request.body;
		const errors = validationResult(request);
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		else if (errors.isEmpty()) {
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
					const sql = 'SELECT * FROM users WHERE email=$1';
					const param = [email];
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
					if (result.rowCount > 0) {
						return response.status(400).json({
							status: 400,
							message: 'Sign in instead',
						});
					}
					else {
						const sql = 'INSERT INTO users (email, password)  VALUES($1, $2)';
						const params = [email, password];
						return pool.query(sql, params);
					}
				})
				.catch(error => {
					if (error) {
						console.log(error)
						return response.status(500).json({
							status: 500,
							error: 'server is down'
						});
					}
				})
				.then((result) => {
					if (result.rowCount > 0) {
						const token = jwt.sign(
							{
								email
							},
							privateKey, {
								expiresIn: '24h'
							}
						);
						const data = { token, email };
						response.status(201).json({
							status: 201,
							data
						});
					}
				});
		}
	}
	static signInFunction(request, response) {
		const queryParams = request.query;
		const queryLength = Object.keys(queryParams).length;
		const { email, password } = request.body;
		const errors = validationResult(request);
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		else if (errors.isEmpty()) {
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
					const sql = 'SELECT * FROM users WHERE email=$1 AND password=$2';
					const param = [email, password];
					return pool.query(sql, param);
				})
				.catch(error => {
					if (error) {
						return response.status(400).json({
							status: 400,
							error: 'Email/Password Did Not match'
						});
					}
				})
				.then((result) => {
					if (!result.rowCount > 0) {
						response.status(400).json({
							status: 400,
							error: 'Email/Password Did Not match'
						});
					}
					else {
						const token = response.locals.token;
						const data = { token, email };
						response.status(200).json({
							status: 200,
							data
						});
					}
				});
		}
	}
}
export default Users;
