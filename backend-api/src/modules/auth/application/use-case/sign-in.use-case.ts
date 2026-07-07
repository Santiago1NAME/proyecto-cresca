import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserFinderPort } from '../../domain/port/user-finder.port';
import { PasswordVerifierRepository } from '../../domain/repository/password-verifier.repository';
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
    ) {}

    async execute(dto: SignInDto): Promise<SignInResponse> {
        const userValue = await this.userFinder.findByEmail(dto.email);
        if (!userValue) {
            throw new UserNotFoundAuthException(dto.email);
        }

        const isMatch = await this.passwordVerifier.verify(dto.password, userValue.password);
        if (!isMatch) {
            throw new InvalidCredentialsException();
        }

        const listaRoles = [
            ...new Set(userValue.userRoles?.map(u => u.role.modulo) ?? []),
            ...(userValue.userRoles?.map(u => u.role.rol) ?? [])
        ];

        const { password: _, userRoles: __, ...userWithoutPassword } = userValue;

        const payload = { sub: userValue.id, user: userWithoutPassword, roles: listaRoles };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
