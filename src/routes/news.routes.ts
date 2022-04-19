import express from 'express';
import { getNewsByCategoryHandler } from '../controller/news.controller';
import validateResource from '../middleware/validateResource';
import { getNewsByCategorySchema } from '../schema/news.schema';

const router = express.Router();
router.get(
  '/news/:category',
  validateResource(getNewsByCategorySchema),
  getNewsByCategoryHandler
);
export default router;
