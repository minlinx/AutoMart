import SendEmailFunction from '../../helpers/sendEmail';
import UsersModel from '../models/users';
const resetPasswordFunction = async (request, response, next) => {
	const userEmail = request.params.user_email;
	try {
		const foundEmail = await UsersModel.getUserData(userEmail);
		const userPassword = foundEmail.rows[0].password;
		const mailOptions = {
			from: 'mbanelsonifeanyi@gmail.com',
			to: userEmail,
			subject: 'Password Reset',
			text: `<div>Your  Password ${userPassword}</div>`
		};
		const sent = await SendEmailFunction(mailOptions);
		if (sent) {
			return response.status(200).json({
				status: 200,
				data: 'A message has been sent to email address'
			});
		}
	} catch (error) {
		return next(error);
	}
};
export default resetPasswordFunction;
