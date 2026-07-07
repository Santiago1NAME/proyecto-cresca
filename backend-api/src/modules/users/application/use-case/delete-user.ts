import { FindUserByIdDTO } from './../dto/find-user-by-id.dto';
import { UserRepository } from "../../domain/repository/user.repository";
import { UserResponseDto } from "../dto/user-response.dto";
import { UserNotFoundException } from '../../domain/exception/user-not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository){}

    async execute(findUserByIdDTO: FindUserByIdDTO): Promise<{ user: UserResponseDto }>{
        const user = await this.userRepository.findById(findUserByIdDTO.id);
        if (!user) {
            throw new UserNotFoundException(findUserByIdDTO.id);
        }
        await this.userRepository.delete(findUserByIdDTO.id);
        return { user: user.toValue() }
    }
}