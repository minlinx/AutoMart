import express from 'express';
import checkuserAuthentication from '../../middlewares/checkUserAuthentication';
import Users from '../controllers/users';
const router = express.Router();

router.post('/:param', checkuserAuthentication, Users.signUpAndSignIn);

export default router;

