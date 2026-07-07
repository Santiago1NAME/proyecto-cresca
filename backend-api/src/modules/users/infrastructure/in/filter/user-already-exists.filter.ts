import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { UserAlreadyExistsException } from "../../../domain/exception/user-already-exists.exception";

@Catch(UserAlreadyExistsException)
export class UserAlreadyExistsExceptionFilter implements ExceptionFilter {
    catch(exception: UserAlreadyExistsException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(409).json({
            statusCode: 409,
            message: exception.message,
            error: "Usuario ya existe",
        });
    }
}