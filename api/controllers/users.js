import jwt from 'jsonwebtoken';
import usersDB from '../models/users';
import { validationResult } from 'express-validator/check';
const privateKey = process.env.JWT_PRIVATE_KEY;
class Users {
	static signUpFunction(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const { email, password } = request.body;
		const hashedPassword = parseInt(password, 36);
		const vehicleOwner = usersDB.find((user) => user.email === email);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (errors.isEmpty() && vehicleOwner) {
			const { firstName } = vehicleOwner;
			const url = request.route.path.toString();
			const token = jwt.sign(
				{
					email,
					firstName
				},
				privateKey
			);
			const newId = usersDB.length + 1;
			const data = { token, hashedPassword, ...vehicleOwner };
			if (url === '/signup') {
				const data = { token, hashedPassword, ...vehicleOwner, id: newId };
				response.status(201).json({
					status: 201,
					data
				});
			}
			response.status(200).json({
				status: 200,
				data
			});
		}
	}
}
export default Users;
