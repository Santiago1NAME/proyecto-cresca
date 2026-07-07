import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsIn,
  MinLength,
  Matches,
  IsUUID
} from 'class-validator';
export class CreateUserHttpDto {
    @IsNotEmpty()
    @IsString()
    userName!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsIn(['CC', 'CE', 'PASAPORTE'])
    tipoDocumento!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {
        message: 'El documento debe tener al menos 6 caracteres',
    })
    cedula!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, {
        message: 'La contraseña debe tener al menos 8 caracteres',
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]+$/, {
        message:
        'La contraseña debe contener mayúsculas, minúsculas, números y no tener espacios',
    })
    password!: string;
}