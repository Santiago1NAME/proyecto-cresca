import { Body, Controller, Post } from '@nestjs/common';
import { SignInUseCase } from '../../../../application/use-case/sign-in.use-case';
import { SignInHttpDto } from './sign-in.http-dto';
import { Public } from 'src/core/auth/public.decorator';

@Controller('auth')
export class SignInController {
    constructor(private readonly signInUseCase: SignInUseCase) {}

    @Public()
    @Post('login')
    async login(@Body() body: SignInHttpDto) {
        return this.signInUseCase.execute(body);
    }
}
