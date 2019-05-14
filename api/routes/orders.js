import express from 'express';
// import validator from '../../middlewares/getRouteHandler';
import Orders from '../controllers/order';
const { createOrder, updateOrder } = Orders;
const router = express.Router();
router.post('/', createOrder);
router.patch('/:orderId/:price', updateOrder);
export default router;
