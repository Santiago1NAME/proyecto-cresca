import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/core/auth/public.decorator';
import { TokenBlacklistPort } from '../../../domain/port/token-blacklist.port';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private tokenBlacklist: TokenBlacklistPort,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token =
      this.extractTokenFromHeader(request) ??
      this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException(
        'No se proporcionó token de autenticación',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      if (payload.type === 'refresh') {
        throw new UnauthorizedException(
          'Token de refresco no es válido para autenticación',
        );
      }

      if (payload.jti) {
        const revoked = await this.tokenBlacklist.isRevoked(payload.jti);
        if (revoked) {
          throw new UnauthorizedException(
            'Token de autenticación ha sido revocado',
          );
        }
      }

      request['user'] = payload;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Token de autenticación inválido');
    }

    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const cookies = request.headers['cookie']?.split(';') ?? [];
    const tokenCookie = cookies.find((c) => c.trim().startsWith('token='));
    return tokenCookie?.split('=')[1]?.trim();
  }
}
