import { Body, Controller, Post } from '@nestjs/common';
import { RefreshUseCase } from '../../../../application/use-case/refresh.use-case';
import { RefreshHttpDto } from './refresh.http-dto';
import { Public } from 'src/core/auth/public.decorator';

@Controller('auth')
export class RefreshController {
  constructor(private readonly refreshUseCase: RefreshUseCase) {}

  @Public()
  @Post('refresh')
  async refresh(@Body() body: RefreshHttpDto) {
    return this.refreshUseCase.execute(body.refresh_token);
  }
}
