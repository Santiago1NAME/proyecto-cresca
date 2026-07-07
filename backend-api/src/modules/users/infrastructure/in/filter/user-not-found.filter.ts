import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { UserNotFoundException } from "../../../domain/exception/user-not-found.exception";

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: UserNotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(404).json({
            statusCode: 404,
            message: exception.message,
            error: "No encontrado",
        });
    }
}