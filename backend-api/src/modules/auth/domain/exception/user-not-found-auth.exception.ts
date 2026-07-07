import { NotFoundException } from '@nestjs/common';

export class UserNotFoundAuthException extends NotFoundException {
    constructor(email: string) {
        super(`El usuario con email ${email} no existe`);
    }
}
