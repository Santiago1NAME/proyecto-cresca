export interface RolesUser {
    userRoles?: Array<{
        role: {
            modulo: string;
            rol: string;
        };
    }>;
}

export abstract class RolesUserPort {
    abstract findRolesByUserId(id: string): Promise<RolesUser | null>;
}
