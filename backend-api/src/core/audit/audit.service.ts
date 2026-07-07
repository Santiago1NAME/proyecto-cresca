import { Injectable, Logger } from '@nestjs/common';
import { AuditLog } from './interface/audit.interface';
import { Audit } from './entity/audit.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuditService {
    private readonly logger = new Logger(AuditService.name);

    constructor(@InjectRepository(Audit) private auditRepository: Repository<Audit>) { }

    async log(data: AuditLog) {
        try {
            return await this.auditRepository.save({
                idUser: data.userId,
                action: data.action,
                modulo: data.modulo,
                ip: data.ip
            });
        } catch (error) {
            this.logger.error(`Error al guardar log de auditoría: ${error.message}`, error.stack);
            return null;
        }
    }
}
