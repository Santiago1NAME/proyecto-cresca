import { SetMetadata } from "@nestjs/common";
import { Role } from "./roles.enum";

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);