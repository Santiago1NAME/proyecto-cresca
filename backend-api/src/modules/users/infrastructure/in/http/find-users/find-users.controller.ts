import { Controller, Get, Query } from "@nestjs/common";
import { Audit } from "src/core/audit/audit.decorator";
import { ModuleAccess } from "src/core/roles/module.decorator";
import { RolesDecorator } from "src/core/roles/roles.decorator";
import { Modules, Roles } from "src/core/roles/roles.enum";
import { FindUsersTableUseCase } from "src/modules/users/application/use-case/find-users-table";
import { UserResponseDto } from "src/modules/users/application/dto/user-response.dto";
import { V1_USERS } from "../../route.constants";
import { Public } from "src/core/auth/public.decorator";

@ModuleAccess(Modules.users)
@Controller(V1_USERS)
export class FindUsersController {
    constructor(private readonly findUsersUseCase: FindUsersTableUseCase) {}
    
    @Audit({ action: 'Entro a ver usuarios', modulo: 'Usuarios' })
    @Get()
    @RolesDecorator(Roles.users.create)
    async run(
        @Query('page') page: number = 1, 
        @Query('limit') limit: number = 10
    ) : Promise<{ users: UserResponseDto[], total: number, page: number, limit: number, totalPages: number }> {
        const paginate = { page, limit };
        return await this.findUsersUseCase.execute(paginate);
    }
}