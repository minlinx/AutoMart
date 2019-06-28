import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import carsRoute from '../api/routes/cars';
import usersRoute from '../api/routes/users';
import ordersRoute from '../api/routes/orders';
import apiError from '../middlewares/apiError';
import swaggerDocument from '../swagger/swagger.json';
dotenv.config();

const { notFoundError, serverError } = apiError;
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static('UI'));
app.use(function (request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', usersRoute);
app.use('/api/v1/car', carsRoute);
app.use('/api/v1/order', ordersRoute);
app.use(notFoundError, serverError);
app.listen(port, () => console.log(`Should Be Listening On Port ${port}...`));
export default app;
