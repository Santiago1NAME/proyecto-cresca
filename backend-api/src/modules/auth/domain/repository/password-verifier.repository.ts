export abstract class PasswordVerifierRepository {
    abstract verify(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
