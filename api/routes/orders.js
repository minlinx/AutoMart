import express from 'express';
// import validator from '../../middlewares/getRouteHandler';
import checkAuthentication from '../../middlewares/checkUserAuthentication';
import Orders from '../controllers/order';

// const { createOrderValidator, updateOrderValidator } = validator;
const { createOrder, updateOrder } = Orders;
const router = express.Router();
router.post('/', checkAuthentication, createOrder);
router.patch('/:order_id/price', checkAuthentication, updateOrder);
export default router;
