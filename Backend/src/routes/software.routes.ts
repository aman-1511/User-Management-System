import { Router } from 'express';
import { 
  createSoftware, 
  getAllSoftware, 
  getSoftwareById, 
  updateSoftware, 
  deleteSoftware 
} from '../controllers/software.controller';
import { authenticate, isAdmin } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();


router.get('/', asyncHandler(getAllSoftware));


router.post('/', authenticate, isAdmin, asyncHandler(createSoftware));
router.get('/:softwareId', asyncHandler(getSoftwareById));
router.patch('/:softwareId', authenticate, isAdmin, asyncHandler(updateSoftware));
router.delete('/:softwareId', authenticate, isAdmin, asyncHandler(deleteSoftware));

export default router; 