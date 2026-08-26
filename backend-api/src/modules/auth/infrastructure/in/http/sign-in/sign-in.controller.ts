import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { SignInUseCase } from '../../../../application/use-case/sign-in.use-case';
import { SignInHttpDto } from './sign-in.http-dto';
import { Public } from 'src/core/auth/public.decorator';

@Controller('auth')
export class SignInController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Public()
  @Post('login')
  async login(@Body() body: SignInHttpDto) {
    return this.signInUseCase.execute(body);
  }
}
