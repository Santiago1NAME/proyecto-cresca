import { Controller, Post, Req } from '@nestjs/common';
import { LogoutUseCase } from '../../../../application/use-case/logout.use-case';
import { Audit } from 'src/core/audit/audit.decorator';
import type { Request } from 'express';

@Controller('auth')
export class LogoutController {
  constructor(private readonly logoutUseCase: LogoutUseCase) {}

  @Audit({ action: 'logout', modulo: 'Auth' })
  @Post('logout')
  async logout(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader?.replace('Bearer ', '') ?? '';

    await this.logoutUseCase.execute(accessToken);

    return { message: 'Sesión cerrada correctamente' };
  }
}
