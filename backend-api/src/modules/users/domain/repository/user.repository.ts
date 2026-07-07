import { User } from "../entities/user.entity";

export abstract class UserRepository {
    abstract findAllForTable(paginate: { page: number, limit: number }): Promise<{ users: User[], total: number, page: number, limit: number, totalPages: number }>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract save(user: User): Promise<User>;
    abstract update(user: User): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract updateUserRoles(userId: string, roleIds: string[]): Promise<void>;
    abstract findRolesByUserId(userId: string): Promise<string[]>;
}