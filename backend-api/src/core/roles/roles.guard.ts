import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";
import { Role } from "./roles.enum";
import { MODULE_KEY } from "./module.decorator";
import { IS_PUBLIC_KEY } from "src/core/auth/public.decorator";
import { RolesUserPort } from "./roles-user.port";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolesUserPort: RolesUserPort,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.sub;

    console.log(request.user);
    if (!userId) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const rawRoles = await this.rolesUserPort.findRolesByUserId(userId);

    if (!rawRoles || Object.keys(rawRoles).length === 0) {
      throw new ForbiddenException('Usted no cuenta con privilegios');
    }

    const modulos = rawRoles?.userRoles?.map(r => r.role.modulo) ?? [];
    const moduleRequired = this.reflector.getAllAndOverride<string>(
      MODULE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (moduleRequired && !modulos.includes(moduleRequired)) {
      throw new ForbiddenException(`No tiene acceso al módulo: ${moduleRequired}`);
    }

    const roles = rawRoles?.userRoles?.map(r => r.role.rol) ?? [];
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (!requiredRoles.some(role => roles.includes(role))) {
      throw new ForbiddenException(`No cuenta con los privilegios necesarios`);
    }

    return true;
  }
}
