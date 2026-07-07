export abstract class PasswordHasherRepository {
    abstract hash(password: string): Promise<string>;
}