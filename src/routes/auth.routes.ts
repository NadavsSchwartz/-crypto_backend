import express from 'express';
import { createSessionHandler } from '../controller/auth.controller';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/auth.schema';

const router = express.Router();

router.post(
  '/session',
  validateResource(createSessionSchema),
  createSessionHandler
);

export default router;
