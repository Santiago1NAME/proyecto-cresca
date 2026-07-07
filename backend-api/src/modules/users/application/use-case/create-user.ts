import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserAlreadyExistsException } from "../../domain/exception/user-already-exists.exception";
import { PasswordHasherRepository } from "../../domain/repository/password-hasher.repository";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";

@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasherRepository
    ) {}

    async execute(dto: CreateUserDto): Promise<{ user: UserResponseDto }> {
        const existingUser = await this.userRepository.findByEmail(dto.email);

        if(existingUser) {
            throw new UserAlreadyExistsException(dto.email);
        }

        const hashedPassword = await this.passwordHasher.hash(dto.password);

        const user = User.create({
            ...dto,
            password: hashedPassword
        });
        const savedUser = await this.userRepository.save(user);
        const { password, ...userWithoutPassword } = savedUser.toValue();
        return { user: userWithoutPassword };
    }
}