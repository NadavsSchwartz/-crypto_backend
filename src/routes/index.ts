import express from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import newsRoutes from './news.routes';
const router = express.Router();

router.get('/status', (_, res) => {
  return res.status(200).send('OK');
});
router.use('/api/', authRoutes);
router.use('/api/', userRoutes);
router.use('/api/', newsRoutes);

export default router;
