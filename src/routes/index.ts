import express from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
const router = express.Router();

router.get('/status', (_, res) => {
   return res.status(200).send('OK');
})
router.use(authRoutes);
router.use(userRoutes);


export default router