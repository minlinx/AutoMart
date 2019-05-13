import express from 'express';
import bodyParser from 'body-parser';
import carsRoute from '../api/routes/cars';

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/car', carsRoute);
app.listen(port, () => console.log(`Should Be Listening On Port ${port}...`));
