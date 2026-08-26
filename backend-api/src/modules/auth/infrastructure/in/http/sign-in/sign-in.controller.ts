import { Body, Controller, Post, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { SignInUseCase } from '../../../../application/use-case/sign-in.use-case';
import { SignInHttpDto } from './sign-in.http-dto';
import { Public } from 'src/core/auth/public.decorator';
import { Audit } from 'src/core/audit/audit.decorator';
import type { Request } from 'express';

@Controller('auth')
export class SignInController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Audit({ action: 'login_exitoso', modulo: 'Auth' })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Public()
  @Post('login')
  async login(@Body() body: SignInHttpDto, @Req() req: Request) {
    return this.signInUseCase.execute(body, req.ip);
  }
}
