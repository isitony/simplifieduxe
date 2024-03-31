import { Response } from 'express';
import { HttpStatus as HttpStatusCode } from '@nestjs/common';

interface SuccessResponseParams<T = any> {
  res: Response;
  statusCode?: HttpStatusCode;
  message?: string;
  data?: T;
}

export function ResponseFormatter<T>({
  res,
  statusCode = HttpStatusCode.OK,
  message = 'Request was successful',
  data,
}: SuccessResponseParams<T>) {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
  });
}
