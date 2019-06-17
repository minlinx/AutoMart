import express from 'express';
import Users from '../controllers/users';
import validator from '../../middlewares/getRouteHandler';
import checkAuthentication from '../../middlewares/checkUserAuthentication';
const { signUpValidator } = validator;
const router = express.Router();

router.post('/signup', signUpValidator(), Users.signUpFunction);
router.post('/signin', checkAuthentication, Users.signInFunction);

export default router;
