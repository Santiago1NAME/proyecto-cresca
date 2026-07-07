import { Controller, Get, Param } from "@nestjs/common";
import { FindUserByIdUseCase } from "src/modules/users/application/use-case/find-user-by-id";
import { ModuleAccess } from "src/core/roles/module.decorator";
import { RolesDecorator } from "src/core/roles/roles.decorator";
import { Modules, Roles } from "src/core/roles/roles.enum";
import { UserResponseDto } from "src/modules/users/application/dto/user-response.dto";
import { V1_USERS } from "../../route.constants";

@ModuleAccess(Modules.users)
@Controller(V1_USERS)
export class FindUserByIdController {
    constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase){}
    
    @RolesDecorator(Roles.users.create)
    @Get(':id')
    async run(@Param('id') id: string): Promise<{ user: UserResponseDto }> {
        return await this.findUserByIdUseCase.execute({ id });
    }
}