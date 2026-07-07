import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { SignInController } from './in/http/sign-in/sign-in.controller';
import { SignInUseCase } from '../application/use-case/sign-in.use-case';
import { UserFinderPort } from '../domain/port/user-finder.port';
import { UserTypeOrmUserFinderAdapter } from './out/user-finder/user-typeorm.adapter';
import { UserRepository } from 'src/modules/users/domain/repository/user.repository';
import { PasswordVerifierRepository } from '../domain/repository/password-verifier.repository';
import { BcryptPasswordVerifier } from './out/crypto/bcrypt-password-verifier';
import { AuthGuard } from './in/guard/auth.guard';
import { UsersModule } from 'src/modules/users/infrastructure/users.module';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'defaultSecretKey',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [SignInController],
    providers: [
        SignInUseCase,
        {
            provide: UserFinderPort,
            useFactory: (userRepository: UserRepository) => {
                return new UserTypeOrmUserFinderAdapter(userRepository);
            },
            inject: [UserRepository],
        },
        {
            provide: PasswordVerifierRepository,
            useClass: BcryptPasswordVerifier,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AuthModule {}
