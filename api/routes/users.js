import express from 'express';
import Users from '../controllers/users';
import validator from '../../middlewares/getRouteHandler';
import checkQueryParams from '../../middlewares/checkQueryParams';
import checkValidationErrrors from '../../middlewares/checkValidationErrors';
import badRequestError from '../../middlewares/400Error';

const { signUpValidator, signInValidator } = validator;
const { signUpFunction, signInFunction } = Users;
const router = express.Router();

router.post('/signup', checkQueryParams, signUpValidator(), checkValidationErrrors, signUpFunction, badRequestError);
router.post('/signin', checkQueryParams, signInValidator(), checkValidationErrrors, signInFunction, badRequestError);

export default router;
