import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';
import { Software } from '../entities/Software';

const softwareRepository = AppDataSource.getRepository(Software);

export const createSoftware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const software = softwareRepository.create(req.body);
    await softwareRepository.save(software);
    res.status(201).json(software);
  } catch (error) {
    next(error);
  }
};

export const getAllSoftware = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const software = await softwareRepository.find();
    res.json(software);
  } catch (error) {
    next(error);
  }
};

export const getSoftwareById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const software = await softwareRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!software) {
      res.status(404).json({ message: 'Software not found' });
      return;
    }
    res.json(software);
  } catch (error) {
    next(error);
  }
};

export const updateSoftware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const software = await softwareRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!software) {
      res.status(404).json({ message: 'Software not found' });
      return;
    }
    softwareRepository.merge(software, req.body);
    const result = await softwareRepository.save(software);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteSoftware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const software = await softwareRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!software) {
      res.status(404).json({ message: 'Software not found' });
      return;
    }
    await softwareRepository.remove(software);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 