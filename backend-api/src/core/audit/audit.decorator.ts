import { SetMetadata } from '@nestjs/common';

export const AUDIT_KEY = 'audit';

export const Audit = (data: {
  action: string;
  modulo: string;
}) => SetMetadata(AUDIT_KEY, data);