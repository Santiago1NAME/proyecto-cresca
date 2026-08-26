export abstract class RefreshTokenPort {
  abstract save(jti: string, userId: string, expiresAt: Date): Promise<void>;
  abstract findValid(
    jti: string,
  ): Promise<{ jti: string; userId: string } | null>;
  abstract revoke(jti: string): Promise<void>;
  abstract revokeAllByUser(userId: string): Promise<void>;
}
