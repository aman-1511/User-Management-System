import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRequestHandler<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncHandler = <T extends Request = Request>(
  fn: AsyncRequestHandler<T>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req as T, res, next)).catch(next);
  };
}; 