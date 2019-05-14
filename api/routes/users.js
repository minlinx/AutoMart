import express from 'express';
// import validator from '../../middlewares/getRouteHandler';
import Users from '../controllers/users';
const router = express.Router();

router.post('/:param', Users.signUpAndSignIn);

export default router;
