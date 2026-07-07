import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AuditService } from "./audit.service";
import { tap } from 'rxjs';
import { Reflector } from "@nestjs/core";
import { AUDIT_KEY } from './audit.decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor{

    constructor(
        private readonly auditService: AuditService,
        private readonly reflector: Reflector
    ) {}

    intercept(context: ExecutionContext, next: CallHandler){
        const req = context.switchToHttp().getRequest();

        const auditMeta = this.reflector.get(
            AUDIT_KEY,
            context.getHandler(),
        );

        return next.handle().pipe(
            tap(() => {
                if (!auditMeta) return;

                this.auditService.log({
                    userId: req.user?.sub ?? 'system',
                    action: auditMeta.action,
                    modulo: auditMeta.modulo,
                    ip: req.ip,
                });
            }),
        );
    }
}