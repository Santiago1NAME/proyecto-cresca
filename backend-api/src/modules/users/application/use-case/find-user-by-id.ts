import { Injectable } from "@nestjs/common";
import { UserNotFoundException } from "../../domain/exception/user-not-found.exception";
import { FindUserByIdDTO } from "../dto/find-user-by-id.dto";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserResponseDto } from "../dto/user-response.dto";

@Injectable()
export class FindUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository){}

    async execute(findUserByIdDTO: FindUserByIdDTO): Promise<{ user: UserResponseDto }> {
        const user = await this.userRepository.findById(findUserByIdDTO.id);
        if (!user) {
            throw new UserNotFoundException(findUserByIdDTO.id);
        }
        const { password, ...userWithoutPassword } = user.toValue();
        return { user: userWithoutPassword };
    }
}