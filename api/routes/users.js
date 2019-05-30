import express from 'express';
import Users from '../controllers/users';
import validator from '../../middlewares/getRouteHandler';
import checkAuth from '../../middlewares/checkUserAuthentication';

const { signUpValidator } = validator;
const router = express.Router();

router.post('/signup', signUpValidator(), Users.signUpFunction);
router.post('/signin', checkAuth, Users.signUpFunction);

export default router;
