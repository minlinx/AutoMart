import jwt from 'jsonwebtoken';
import usersDB from '../models/users';
const privateKey = 'autoMart@minlinx2019';
class Users {
    static signUpAndSignIn(request, response) {
        const { email, password, firstName, lastName, address } = request.body;
        const { param } = request.params;
        console.log(param);
        const strParam = param.toString();
        const token = jwt.sign({
            email,
            firstName
        }, privateKey, { expiresIn: 30 });
        console.log(token);
        if (strParam === 'signup') {
            const updatedUsersDb = [{id: usersDB.length + 1, email, password, firstName, lastName, address }, ...usersDB];
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
        else if (strParam === 'signin' && token) {
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