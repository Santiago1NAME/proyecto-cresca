import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistPort } from '../../domain/port/token-blacklist.port';
import { RefreshTokenPort } from '../../domain/port/refresh-token.port';

@Injectable()
export class LogoutUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(TokenBlacklistPort)
    private readonly tokenBlacklist: TokenBlacklistPort,
    @Inject(RefreshTokenPort)
    private readonly refreshTokenPort: RefreshTokenPort,
  ) {}

  async execute(accessToken: string, refreshToken?: string): Promise<void> {
    try {
      const accessPayload = await this.jwtService.verifyAsync(accessToken);
      if (accessPayload.jti && accessPayload.exp && accessPayload.sub) {
        const expiresAt = new Date(accessPayload.exp * 1000);
        await this.tokenBlacklist.addWithUser(
          accessPayload.jti,
          accessPayload.sub,
          expiresAt,
        );
      }
    } catch {
      // Token ya expirado, no necesita ser añadido a la blacklist
    }

    if (refreshToken) {
      try {
        const refreshPayload = await this.jwtService.verifyAsync(refreshToken);
        if (refreshPayload.jti) {
          await this.refreshTokenPort.revoke(refreshPayload.jti);
        }
      } catch {
        // Token ya expirado o inválido
      }
    }
  }
}
