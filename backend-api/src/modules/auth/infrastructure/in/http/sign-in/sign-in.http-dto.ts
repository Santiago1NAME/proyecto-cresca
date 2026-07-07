import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInHttpDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}
