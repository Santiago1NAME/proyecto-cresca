import { BadRequestException, Body, ConflictException, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/users/application/use-case/create-user";
import { CreateUserHttpDto } from "./create-user.http-dto";
import { UserResponseDto } from "src/modules/users/application/dto/user-response.dto";
import { V1_USERS } from "../../route.constants";
import { ModuleAccess } from "src/core/roles/module.decorator";
import { Modules } from "src/core/roles/roles.enum";
import { Audit } from "src/core/audit/audit.decorator";

@ModuleAccess(Modules.users)
@Controller(V1_USERS)
export class CreateUserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    @Audit({ action: 'Entro a crear un usurio', modulo: 'Usuarios' })
    @Post()
    async run(@Body() createUserHttpDto: CreateUserHttpDto) : Promise<{ user: UserResponseDto }> {
        return await this.createUserUseCase.execute(createUserHttpDto);
    }

}