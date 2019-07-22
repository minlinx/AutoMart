import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import carsRoute from '../api/routes/cars';
import usersRoute from '../api/routes/users';
import ordersRoute from '../api/routes/orders';
import flagsRoute from '../api/routes/flags';
import apiError from '../middlewares/apiError';
import swaggerDocument from '../swagger/swagger.json';
dotenv.config();

const { notFoundError, serverError } = apiError;
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressValidator());
app.use(express.static('UI'));
app.use(function (request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PATCH');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	return next();
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', usersRoute);
app.use('/api/v1/car', carsRoute);
app.use('/api/v1/order', ordersRoute);
app.use('/api/v1/flag', flagsRoute);
app.use(notFoundError, serverError);
app.listen(port, () => console.log(`Should Be Listening On Port ${port}...`));
export default app;
