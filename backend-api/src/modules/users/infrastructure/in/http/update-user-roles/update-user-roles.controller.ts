import { Body, Controller, Param, Patch } from "@nestjs/common";
import { UpdateUserRolesUseCase } from "src/modules/users/application/use-case/update-user-roles";
import { V1_USERS } from "../../route.constants";
import { UpdateUserRolesHttpDto } from "./update-user-roles.http-dto";
import { ModuleAccess } from "src/core/roles/module.decorator";
import { Modules } from "src/core/roles/roles.enum";

@ModuleAccess(Modules.users)
@Controller(V1_USERS)
export class UpdateUserRolesController {
    constructor(
        private readonly updateUserRolesUseCase: UpdateUserRolesUseCase,
    ) {}

    @Patch(':id/role')
    async run(
        @Param('id') id: string,
        @Body() dto: UpdateUserRolesHttpDto,
    ): Promise<{ message: string }> {
        await this.updateUserRolesUseCase.execute(id, dto.roles);
        return { message: 'Roles actualizados correctamente' };
    }
}
