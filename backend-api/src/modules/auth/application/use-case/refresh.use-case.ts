import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { TokenBlacklistPort } from '../../domain/port/token-blacklist.port';
import { RefreshTokenPort } from '../../domain/port/refresh-token.port';
import { UserFinderPort } from '../../domain/port/user-finder.port';
import { InvalidRefreshTokenException } from '../../domain/exception/invalid-refresh-token.exception';
import { SignInResponse } from '../../domain/interface/sign-in-response';

@Injectable()
export class RefreshUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(TokenBlacklistPort)
    private readonly tokenBlacklist: TokenBlacklistPort,
    @Inject(RefreshTokenPort)
    private readonly refreshTokenPort: RefreshTokenPort,
    @Inject(UserFinderPort)
    private readonly userFinder: UserFinderPort,
  ) {}

  async execute(refreshToken: string): Promise<SignInResponse> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch {
      throw new InvalidRefreshTokenException();
    }

    if (payload.type !== 'refresh' || !payload.jti || !payload.sub) {
      throw new InvalidRefreshTokenException();
    }

    const validToken = await this.refreshTokenPort.findValid(payload.jti);
    if (!validToken) {
      throw new InvalidRefreshTokenException();
    }

    const user = await this.userFinder.findById(payload.sub);
    if (!user) {
      throw new InvalidRefreshTokenException();
    }

    const listaRoles = [
      ...new Set(user.userRoles?.map((u) => u.role.modulo) ?? []),
      ...(user.userRoles?.map((u) => u.role.rol) ?? []),
    ];

    // Revocar el refresh token anterior
    await this.refreshTokenPort.revoke(payload.jti);

    // Generar nuevo par de tokens
    const newAccessJti = uuidv4();
    const newRefreshJti = uuidv4();

    const accessPayload = {
      sub: user.id,
      roles: listaRoles,
      jti: newAccessJti,
    };
    const access_token = await this.jwtService.signAsync(accessPayload, {
      expiresIn: '15m',
    });

    const refreshExpiresAt = new Date();
    refreshExpiresAt.setDate(refreshExpiresAt.getDate() + 7);

    const refreshPayload = {
      sub: user.id,
      jti: newRefreshJti,
      type: 'refresh',
    };
    const refresh_token = await this.jwtService.signAsync(refreshPayload, {
      expiresIn: '7d',
    });

    await this.refreshTokenPort.save(newRefreshJti, user.id, refreshExpiresAt);

    return { access_token, refresh_token };
  }
}
