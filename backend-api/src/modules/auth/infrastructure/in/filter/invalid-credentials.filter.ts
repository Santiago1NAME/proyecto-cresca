import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { InvalidCredentialsException } from '../../../domain/exception/invalid-credentials.exception';

@Catch(InvalidCredentialsException)
export class InvalidCredentialsExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidCredentialsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(401).json({
      statusCode: 401,
      message: exception.message,
    });
  }
}
