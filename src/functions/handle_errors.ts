import { Request, Response } from 'express';
import Error from '../interfaces/my-errors';

const handleErrors = (error: Error, req: Request, res: Response) => {
  const status = error.status || 500;
  const message = error.message || 'Server error.';
  res.status(status).json({ status, message });
};

export default handleErrors;
