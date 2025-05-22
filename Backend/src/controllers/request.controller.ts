import { Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';
import { Request as AccessRequest } from '../entities/Request';
import { Software } from '../entities/Software';
import { AuthenticatedRequest } from '../middleware/auth';

const requestRepository = AppDataSource.getRepository(AccessRequest);
const softwareRepository = AppDataSource.getRepository(Software);

export const createRequest = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { softwareId, reason } = req.body;
    const software = await softwareRepository.findOneBy({ id: softwareId });
    if (!software) {
      res.status(404).json({ message: 'Software not found' });
      return;
    }

    const accessRequest = requestRepository.create({
      user: { id: req.user!.id },
      software: { id: softwareId },
      reason,
      status: 'Pending'
    });

    await requestRepository.save(accessRequest);
    res.status(201).json(accessRequest);
  } catch (error) {
    next(error);
  }
};

export const getMyRequests = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('Getting requests for user:', req.user!.id);
    const requests = await requestRepository.find({
      where: { user: { id: req.user!.id } },
      relations: ['user', 'software']
    });
    console.log('Found requests:', JSON.stringify(requests, null, 2));
    
    // Ensure we're sending the correct data structure
    const formattedRequests = requests.map(request => ({
      id: request.id,
      status: request.status,
      reason: request.reason,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
      software: request.software,
      user: request.user
    }));
    
    console.log('Formatted requests:', JSON.stringify(formattedRequests, null, 2));
    res.json(formattedRequests);
  } catch (error) {
    console.error('Error in getMyRequests:', error);
    next(error);
  }
};

export const getAllRequests = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests = await requestRepository.find({
      relations: ['user', 'software']
    });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

export const getPendingRequests = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests = await requestRepository.find({
      where: { status: 'Pending' },
      relations: ['user', 'software']
    });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

export const updateRequestStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    console.log('Updating request status:', { requestId: id, newStatus: status });
    
    const request = await requestRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['user', 'software']
    });

    if (!request) {
      res.status(404).json({ message: 'Request not found' });
      return;
    }

    console.log('Found request:', request);
    
    request.status = status;
    await requestRepository.save(request);
    
    console.log('Updated request:', request);
    
    res.json(request);
  } catch (error) {
    console.error('Error updating request status:', error);
    next(error);
  }
}; 