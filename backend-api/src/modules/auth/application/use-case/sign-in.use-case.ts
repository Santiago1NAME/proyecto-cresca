import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { UserFinderPort } from '../../domain/port/user-finder.port';
import { PasswordVerifierRepository } from '../../domain/repository/password-verifier.repository';
import { RefreshTokenPort } from '../../domain/port/refresh-token.port';
import { SignInDto } from '../dto/sign-in.dto';
import { SignInResponse } from '../../domain/interface/sign-in-response';
import { UserNotFoundAuthException } from '../../domain/exception/user-not-found-auth.exception';
import { InvalidCredentialsException } from '../../domain/exception/invalid-credentials.exception';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(UserFinderPort)
    private readonly userFinder: UserFinderPort,
    private readonly passwordVerifier: PasswordVerifierRepository,
    private readonly jwtService: JwtService,
    @Inject(RefreshTokenPort)
    private readonly refreshTokenPort: RefreshTokenPort,
  ) {}

  async execute(dto: SignInDto): Promise<SignInResponse> {
    const userValue = await this.userFinder.findByEmail(dto.email);
    if (!userValue) {
      throw new UserNotFoundAuthException(dto.email);
    }

    const isMatch = await this.passwordVerifier.verify(
      dto.password,
      userValue.password,
    );
    if (!isMatch) {
      throw new InvalidCredentialsException();
    }

    const listaRoles = [
      ...new Set(userValue.userRoles?.map((u) => u.role.modulo) ?? []),
      ...(userValue.userRoles?.map((u) => u.role.rol) ?? []),
    ];

    const accessJti = uuidv4();
    const refreshJti = uuidv4();

    const accessPayload = {
      sub: userValue.id,
      roles: listaRoles,
      jti: accessJti,
    };
    const access_token = await this.jwtService.signAsync(accessPayload, {
      expiresIn: '15m',
    });

    const refreshExpiresAt = new Date();
    refreshExpiresAt.setDate(refreshExpiresAt.getDate() + 7);

    const refreshPayload = {
      sub: userValue.id,
      jti: refreshJti,
      type: 'refresh',
    };
    const refresh_token = await this.jwtService.signAsync(refreshPayload, {
      expiresIn: '7d',
    });

    await this.refreshTokenPort.save(
      refreshJti,
      userValue.id,
      refreshExpiresAt,
    );

    return { access_token, refresh_token };
  }
}
