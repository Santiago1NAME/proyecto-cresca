import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { UserNotFoundAuthException } from '../../../domain/exception/user-not-found-auth.exception';

@Catch(UserNotFoundAuthException)
export class UserNotFoundAuthExceptionFilter implements ExceptionFilter {
    catch(exception: UserNotFoundAuthException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(404).json({
            statusCode: 404,
            message: exception.message,
        });
    }
}
