import { Injectable } from "@nestjs/common";
import { UserNotFoundException } from "../../domain/exception/user-not-found.exception";
import { UpdateUserByIdDto } from "../dto/update-user-by-id.dto";
import { UserRepository } from "../../domain/repository/user.repository";
import { PasswordHasherRepository } from "../../domain/repository/password-hasher.repository";
import { UserResponseDto } from "../dto/user-response.dto";

@Injectable()
export class UpdateUserByIdUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasherRepository,
    ){}

    async execute(
        updateUserByIdDto: UpdateUserByIdDto
    ): Promise<{ user: UserResponseDto }> {
        const user = await this.userRepository.findById(updateUserByIdDto.id);
        if (!user) {
            throw new UserNotFoundException(updateUserByIdDto.id);
        }

        user.update({
            userName: updateUserByIdDto.userName,
            email: updateUserByIdDto.email,
            tipoDocumento: updateUserByIdDto.tipoDocumento,
            cedula: updateUserByIdDto.cedula,
        });

        if (updateUserByIdDto.password) {
            const hashedPassword = await this.passwordHasher.hash(updateUserByIdDto.password);

            user.update({
                password: hashedPassword,
            });
        }

        await this.userRepository.update(user);
        const { password, ...userWithoutPassword } = user.toValue();
        return { user: userWithoutPassword };
    }
}