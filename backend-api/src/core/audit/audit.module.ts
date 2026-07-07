import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditInterceptor } from './audit.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './entity/audit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Audit])
  ],
  providers: [AuditService, AuditInterceptor],
  exports: [AuditService],
})
export class AuditModule { }