import { Body, Controller, Patch, Param } from "@nestjs/common";
import { UpdateUserByIdUseCase } from "src/modules/users/application/use-case/update-user-by-id";
import { V1_USERS } from "../../route.constants";
import { UpdateUserByIdHttpDto } from "./update-user-by-id.http-dto";
import { ModuleAccess } from "src/core/roles/module.decorator";
import { Modules } from "src/core/roles/roles.enum";
import { Public } from "src/core/auth/public.decorator";
import { UserResponseDto } from "src/modules/users/application/dto/user-response.dto";

@ModuleAccess(Modules.users)
@Controller(V1_USERS)
//@Public()
export class UpdateUserByIdController {
    constructor(private readonly updateUserByIdUseCase: UpdateUserByIdUseCase){}

    @Patch(':id')
    async run(
        @Param('id') id: string,
        @Body() dto: UpdateUserByIdHttpDto
    ): Promise<{ user: UserResponseDto; message: string }> {
        const { user } = await this.updateUserByIdUseCase.execute({ id, ...dto });
        return {
            user,
            message: 'Usuario actualizado correctamente',
        };
    }
}