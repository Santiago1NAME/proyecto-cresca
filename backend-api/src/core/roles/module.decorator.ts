import { SetMetadata } from '@nestjs/common';
import { ModuleKey } from './roles.enum';

export const MODULE_KEY = 'module_access';

export const ModuleAccess = (module: ModuleKey) => SetMetadata(MODULE_KEY, module);