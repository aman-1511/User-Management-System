import { Router } from 'express';
import authRoutes from './auth.routes';
import softwareRoutes from './software.routes';
import requestRoutes from './request.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/software', softwareRoutes);
router.use('/requests', requestRoutes);

export default router; 