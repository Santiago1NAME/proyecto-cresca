import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      response.status(status).json({
        statusCode: status,
        message: exceptionResponse.message ?? exception.message,
        errors: exceptionResponse.errors ?? null,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    response.status(500).json({
      statusCode: 500,
      message: 'Error interno del servidor',
      errors: null,
      timestamp: new Date().toISOString(),
    });
  }
}
