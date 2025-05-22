import { Router } from 'express';
import { 
  createRequest, 
  getMyRequests, 
  getAllRequests, 
  updateRequestStatus
} from '../controllers/request.controller';
import { authenticate, isManager } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();


router.get('/my', authenticate, asyncHandler(getMyRequests));
router.post('/', authenticate, asyncHandler(createRequest));


router.get('/pending', authenticate, isManager, asyncHandler(getAllRequests));
router.get('/', authenticate, isManager, asyncHandler(getAllRequests));
router.patch('/:requestId', authenticate, isManager, asyncHandler(updateRequestStatus));

export default router; 