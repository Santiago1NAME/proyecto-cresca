import { Injectable, Logger } from '@nestjs/common';
import { AuditLog } from './interface/audit.interface';
import { Audit } from './entity/audit.entity';
import { Repository, MoreThan, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    @InjectRepository(Audit)
    private auditRepository: Repository<Audit>,
  ) {}

  async log(data: AuditLog) {
    try {
      return await this.auditRepository.save({
        idUser: data.userId,
        action: data.action,
        modulo: data.modulo,
        ip: data.ip,
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Error al guardar log de auditoría: ${msg}`, stack);
      return null;
    }
  }

  async logAuthFailure(data: { action: string; ip: string; email?: string }) {
    try {
      return await this.auditRepository.save({
        idUser: 'auth_failure',
        action: data.action,
        modulo: 'Auth',
        ip: data.ip,
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Error al guardar log de auth failure: ${msg}`, stack);
      return null;
    }
  }

  async detectSuspiciousActivity(ip: string): Promise<boolean> {
    try {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      const failedAttempts = await this.auditRepository.count({
        where: {
          ip,
          action: Like('login_fallido%'),
          createdAt: MoreThan(fifteenMinutesAgo),
        },
      });
      return failedAttempts >= 5;
    } catch {
      return false;
    }
  }
}
