import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import checkAuthentication from '../../middlewares/checkUserAuthentication';
import checkQueryParams from '../../middlewares/checkQueryParams';
import badRequestError from '../../middlewares/400Error';
import checkValidationErrrors from '../../middlewares/checkValidationErrors';
import Flags from '../controllers/flags';


const router = express.Router();
router.post('/', checkQueryParams, validator.flagValidator(), checkValidationErrrors, checkAuthentication, Flags.createFlag, badRequestError);
export default router;
