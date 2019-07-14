import jwt from 'jsonwebtoken';
import pool from '../../dbConifg';
import { validationResult } from 'express-validator/check';
import bcryptHash from '../../middlewares/bcryptHash';
const privateKey = process.env.JWT_PRIVATE_KEY || 'automart';
class Users {
	static async signUpFunction(request, response, next) {
		const queryParams = request.query;
		const queryLength = Object.keys(queryParams).length;
		const { email, password, first_name, last_name, address } = request.body;
		const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(automart)\.com$/g;
		const isAdmin = regex.test(email);
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
						const hashedPassword = bcryptHash.hashPassword(password);
						const sql = 'INSERT INTO users (email, password, first_name, last_name, address, is_admin)  VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
						const params = [email, hashedPassword, first_name, last_name, address, isAdmin];
						return pool.query(sql, params);
					}
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
					if (result.rowCount > 0) {
						const token = jwt.sign(
							{
								email, first_name
							},
							privateKey, {
								expiresIn: '24h'
							}
						);
						const data = {...result.rows[0], token, email };
						response.status(201).json({
							status: 201,
							data
						});
					}
				});
		}
	}
	static async signInFunction(request, response, next) {
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
							error: 'Check Your Inputs'
						});
					}
				})
				.then((result) => {
					if (!result.rowCount > 0) {
						response.status(400).json({
							status: 400,
							error: 'Sign up Instead'
						});
					}
					else if (bcryptHash.correctPassword(password, result.rows[0].password)) {
						const { id, email } = result.rows[0];
						const token = jwt.sign(
							{
								id, email
							},
							privateKey, {
								expiresIn: '24h'
							}
						);
						const { first_name, last_name, address, is_admin } = { ...result.rows[0] };
						const data = { is_admin, token, id, first_name, last_name, email, address };
						response.status(200).json({
							status: 200,
							data
						});
					}
					else {
						response.status(403).json({
							status: 403,
							error: 'Forbidden'
						});
					}
				});
		}
	}
}
export default Users;
