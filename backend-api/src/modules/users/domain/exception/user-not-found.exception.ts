export class UserNotFoundException extends Error {
    constructor(id: string | number) {
        super(`Usuario con id ${id} no encontrado`);
        this.name = "UserNotFoundException";
    }
}