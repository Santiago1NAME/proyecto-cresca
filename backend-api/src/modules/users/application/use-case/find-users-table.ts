import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserResponseDto } from "../dto/user-response.dto";

@Injectable()
export class FindUsersTableUseCase {
    constructor(private readonly userRepository: UserRepository){}

    async execute(paginate: { page: number, limit: number }): Promise<{ users: UserResponseDto[], total: number, page: number, limit: number, totalPages: number }> {
        const result = await this.userRepository.findAllForTable(paginate);
        const users = result.users.map(user => {
            const { password, ...userWithoutPassword } = user.toValue();
            return userWithoutPassword;
        });
        return {
            users,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
        };
    }
}