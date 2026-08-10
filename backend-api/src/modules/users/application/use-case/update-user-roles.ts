import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserNotFoundException } from "../../domain/exception/user-not-found.exception";

@Injectable()
export class UpdateUserRolesUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async execute(userId: string, roleIds: string[]): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundException(userId);
        }

        await this.userRepository.updateUserRoles(userId, roleIds);
    }
}
