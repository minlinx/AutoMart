import express from 'express';
// import validator from '../../middlewares/getRouteHandler';
import Orders from '../controllers/order';

const router = express.Router();
router.post('/', Orders.createOrder);
export default router;
