import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { SignInController } from './in/http/sign-in/sign-in.controller';
import { LogoutController } from './in/http/logout/logout.controller';
import { RefreshController } from './in/http/refresh/refresh.controller';
import { SignInUseCase } from '../application/use-case/sign-in.use-case';
import { LogoutUseCase } from '../application/use-case/logout.use-case';
import { RefreshUseCase } from '../application/use-case/refresh.use-case';
import { UserFinderPort } from '../domain/port/user-finder.port';
import { UserTypeOrmUserFinderAdapter } from './out/user-finder/user-typeorm.adapter';
import { UserRepository } from 'src/modules/users/domain/repository/user.repository';
import { PasswordVerifierRepository } from '../domain/repository/password-verifier.repository';
import { BcryptPasswordVerifier } from './out/crypto/bcrypt-password-verifier';
import { TokenBlacklistPort } from '../domain/port/token-blacklist.port';
import { TokenBlacklistTypeormRepository } from './out/persistence/typeorm/repositories/token-blacklist-typeorm.repository';
import { RefreshTokenPort } from '../domain/port/refresh-token.port';
import { RefreshTokenTypeormRepository } from './out/persistence/typeorm/repositories/refresh-token-typeorm.repository';
import { AuthGuard } from './in/guard/auth.guard';
import { UsersModule } from 'src/modules/users/infrastructure/users.module';
import { TokenBlacklistEntity } from './out/persistence/typeorm/entities/token-blacklist.entity';
import { RefreshTokenEntity } from './out/persistence/typeorm/entities/refresh-token.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([TokenBlacklistEntity, RefreshTokenEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [SignInController, LogoutController, RefreshController],
  providers: [
    SignInUseCase,
    LogoutUseCase,
    RefreshUseCase,
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
      provide: TokenBlacklistPort,
      useClass: TokenBlacklistTypeormRepository,
    },
    {
      provide: RefreshTokenPort,
      useClass: RefreshTokenTypeormRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
