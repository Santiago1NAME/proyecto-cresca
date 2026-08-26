export abstract class TokenBlacklistPort {
  abstract add(jti: string, expiresAt: Date): Promise<void>;
  abstract addWithUser(
    jti: string,
    userId: string,
    expiresAt: Date,
  ): Promise<void>;
  abstract isRevoked(jti: string): Promise<boolean>;
}
