export interface AuditLog{
    userId?: string;
    action: string;
    modulo: string;
    ip?: string;
}