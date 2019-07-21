import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import checkAuthentication from '../../middlewares/checkUserAuthentication';
import checkQueryParams from '../../middlewares/checkQueryParams';
import checkValidationErrrors from '../../middlewares/checkValidationErrors';
import badRequestError from '../../middlewares/400Error';
import Orders from '../controllers/order';

const { createOrderValidator, updateOrderValidator } = validator;
const { createOrder, updateOrder } = Orders;
const router = express.Router();
router.post('/', checkQueryParams, createOrderValidator(), checkValidationErrrors, checkAuthentication, createOrder, badRequestError);
router.patch('/:order_id/price', checkQueryParams, updateOrderValidator(), checkValidationErrrors, checkAuthentication, updateOrder, badRequestError);
export default router;
