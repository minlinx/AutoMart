import jwt from 'jsonwebtoken';
import bcryptHash from '../../middlewares/bcryptHash';
import UsersModel from '../models/users';
// const { insertIntoDatabase, deleteDataFromDatabase, findOneAndUpdate, getAll, getUserData } = UsersModel;
const privateKey = process.env.JWT_PRIVATE_KEY || 'automart';
class Users {
	static async signUpFunction(request, response, next) {
		const { email, password, first_name, last_name, address } = request.body;
		if (email && password && first_name && last_name && address) {
			try {
				const userDatabaseResult = await UsersModel.getUserEmail(email);
				if (!userDatabaseResult.rowCount > 0) {
					const hashedPassword = bcryptHash.hashPassword(password);
					const userData = { email, password: hashedPassword, first_name, last_name, address };
					const result = await UsersModel.insertIntoDatabase(userData);
					const token = jwt.sign(
						{
							first_name, email
						},
						privateKey, {
							expiresIn: '24h'
						}
					);
					const { id, is_admin } = { ...result.rows[0] };
					const data = { id, is_admin, token, first_name, last_name, email, address };
					return response.status(201).json({
						status: 201,
						data
					});
				}
				else {
					return response.status(400).json({
						status: 400,
						error: 'Signin Instead'
					});
				}
			} catch (error) {
				return await next(error);
			}
		}
	}
	static async signInFunction(request, response, next) {
		const { email, password } = request.body;
		try {
			const userDatabaseResult = await UsersModel.getUserData(email);
			const hashedPassword = userDatabaseResult.rows[0].password;
			if (bcryptHash.correctPassword(password, hashedPassword)) {
				const { id } = userDatabaseResult.rows[0];
				const token = jwt.sign(
					{
						id, email
					},
					privateKey, {
						expiresIn: '24h'
					}
				);
				const { first_name, last_name, address, is_admin } = { ...userDatabaseResult.rows[0] };
				const data = { id, is_admin, token, first_name, last_name, email, address };
				return response.status(200).json({
					status: 200,
					data
				});
			}
			return response.status(400).json({
				status: 400,
				error: 'Invalid Username or Password'
			});
		} catch (error) {
			return await next(error);
		}
	}
}
export default Users;
