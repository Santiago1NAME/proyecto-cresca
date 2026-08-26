import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { RefreshUseCase } from '../../../../application/use-case/refresh.use-case';
import { RefreshHttpDto } from './refresh.http-dto';
import { Public } from 'src/core/auth/public.decorator';
import { Audit } from 'src/core/audit/audit.decorator';

@Controller('auth')
export class RefreshController {
  constructor(private readonly refreshUseCase: RefreshUseCase) {}

  @Audit({ action: 'refresh_token', modulo: 'Auth' })
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Public()
  @Post('refresh')
  async refresh(@Body() body: RefreshHttpDto) {
    return this.refreshUseCase.execute(body.refresh_token);
  }
}
