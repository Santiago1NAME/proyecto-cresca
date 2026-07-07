import {
  IsEmail,
  IsOptional,
  IsString,
  IsIn,
  MinLength,
  Matches,
  IsUUID
} from 'class-validator';
export class UpdateUserByIdHttpDto {
    @IsOptional()
    @IsString()
    userName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsIn(['CC', 'CE', 'PASAPORTE'])
    tipoDocumento?: string;

    @IsOptional()
    @IsString()
    @MinLength(6, {
        message: 'El documento debe tener al menos 6 caracteres',
    })
    cedula?: string;

    @IsOptional()
    @IsString()
    @MinLength(8, {
        message: 'La contraseña debe tener al menos 8 caracteres',
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]+$/, {
        message:
        'La contraseña debe contener mayúsculas, minúsculas, números y no tener espacios',
    })
    password?: string;
}