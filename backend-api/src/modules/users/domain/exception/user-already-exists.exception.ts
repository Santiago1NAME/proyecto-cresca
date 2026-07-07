export class UserAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`El usuario ${email} ya existe`);
    this.name = "UserAlreadyExistsException"
  }
}