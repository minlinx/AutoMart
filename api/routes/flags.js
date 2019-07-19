import express from 'express';
import validator from '../../middlewares/getRouteHandler';
import checkAuthentication from '../../middlewares/checkUserAuthentication';
import Flags from '../controllers/flags';


const router = express.Router();
router.post('/', checkAuthentication, validator.flagValidator(), Flags.createFlag);
export default router;
