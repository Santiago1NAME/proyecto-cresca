import { IsArray, IsUUID } from 'class-validator';

export class UpdateUserRolesHttpDto {
    @IsArray()
    roles: string[];
}
