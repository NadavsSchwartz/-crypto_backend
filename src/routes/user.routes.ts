import express from 'express';
import {
  createUserHandler,
  forgotPasswordHandler,
  verifyUserHandler,
} from '../controller/user.controller';
import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  forgotPasswordSchema,
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
export default router;
