import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { UserHasRelationsException } from "../../../domain/exception/user-has-relations.exception";

@Catch(UserHasRelationsException)
export class UserHasRelationsExceptionFilter implements ExceptionFilter {
    catch(exception: UserHasRelationsException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(409).json({
            statusCode: 409,
            message: exception.message,
            error: "Conflicto",
        });
    }
}