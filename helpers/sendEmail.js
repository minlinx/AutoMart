import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: 'mbanelsonifeanyi@gmail.com',
		pass: process.env.EMAIL_PASSWORD
	}
}));

const sendEmailFunction = (mailOptions) => {
	return transporter.sendMail(mailOptions);
};
export default sendEmailFunction;
