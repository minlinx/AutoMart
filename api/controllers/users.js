import jwt from 'jsonwebtoken';
import usersDB from '../models/users';
const privateKey = 'autoMart@minlinx2019';
///////This code looks like this because of the challenge's response specification
class Users {
	static signUpAndSignIn(request, response) {
		const token = request.headers.authorization.split(' ')[1];
		const { email, password, firstName, lastName, address } = request.body;
		const { param } = request.params;
		const strParam = param.toString();
		if (strParam === 'signup') {
			const token = jwt.sign(
				{
					email,
					firstName
				},
				privateKey,
				{ expiresIn: '6h' }
			);
			const updatedUsersDb = [
				{
					id: usersDB.length + 1,
					email,
					password,
					firstName,
					lastName,
					address
				},
				...usersDB
			];
			console.log(updatedUsersDb);
			response.status(201).json({
				status: 201,
				data: {
					token,
					id: usersDB.length + 1,
					firstName,
					lastName,
					email,
					address
				}
			});
		}
		if (strParam === 'signin') {
			return response.status(202).json({
				status: 202,
				data: {
					token,
					id: usersDB.length + 1,
					firstName,
					lastName,
					address
				}
			});
		}
		response.status(400).json({
			status: 400,
			message: 'Authentication Failed'
		});
	}
}
export default Users;
