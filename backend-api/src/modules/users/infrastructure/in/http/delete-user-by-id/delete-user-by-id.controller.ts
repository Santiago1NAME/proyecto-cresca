import { UserResponseDto } from 'src/modules/users/application/dto/user-response.dto';
import { BadRequestException, ConflictException, Controller, Delete, Param } from "@nestjs/common";
import { V1_USERS } from "../../route.constants";
import { DeleteUserUseCase } from "src/modules/users/application/use-case/delete-user";
import { ModuleAccess } from "src/core/roles/module.decorator";
import { Modules } from "src/core/roles/roles.enum";

@ModuleAccess(Modules.users)
@Controller(V1_USERS)
export class DeleteUserByIdController{

    constructor(private readonly deleteUserUseCase: DeleteUserUseCase){}

    @Delete(':id')
    async run(@Param('id') id: string): Promise<{ message: string }>{
        await this.deleteUserUseCase.execute({ id });
        return { message: "Usuario eliminado correctamente" };
    }
}