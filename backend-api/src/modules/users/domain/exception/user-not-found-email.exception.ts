export class UserNotFoundByEmailException extends Error {
    constructor(email: string) {
        super(`El usuario con email ${email} no fue encontrado`);
        this.name = "UserNotFoundByEmailException";
    }
}