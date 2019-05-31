import express from 'express';
import expressValidator  from 'express-validator';
import bodyParser from 'body-parser';
import carsRoute from '../api/routes/cars';
import usersRoute from '../api/routes/users';
import ordersRoute from '../api/routes/orders';
import apiError from '../middlewares/apiError';

const { notFoundError, serverError} = apiError;
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/api/v1/auth', usersRoute);
app.use('/api/v1/car', carsRoute);
app.use('/api/v1/order', ordersRoute);
app.use(notFoundError, serverError);
app.listen(port, () => console.log(`Should Be Listening On Port ${port}...`));
export default app;
