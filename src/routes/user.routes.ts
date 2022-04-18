import express from 'express';
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from '../controller/user.controller';
import requireUser from '../middleware/requestUser';
import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from '../schema/user.schema';
const router = express.Router();

router.post(
  '/users/signup',
  validateResource(createUserSchema),
  createUserHandler
);

router.get(
  '/users/verify/:verificationCode',
  validateResource(verifyUserSchema),
  verifyUserHandler
);

router.post(
  '/users/forgot-password',
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  '/users/reset-password/:passwordResetCode',
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.get('/users/me', requireUser, getCurrentUserHandler);
export default router;
