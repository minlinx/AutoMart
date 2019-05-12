import express from 'express';
import carsRoute from '../api/routes/cars';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/v1/car', carsRoute);
app.listen(port, () => console.log(`Should Be Listening On Port ${port}...`));
