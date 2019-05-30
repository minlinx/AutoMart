import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import Orders from '../controllers/order';

const { createOrderValidator, updateOrderValidator } = validator;
const { createOrder, updateOrder } = Orders;
const router = express.Router();
router.post('/', createOrderValidator(), createOrder);
router.patch('/:orderId/price', updateOrderValidator(), updateOrder);
export default router;
