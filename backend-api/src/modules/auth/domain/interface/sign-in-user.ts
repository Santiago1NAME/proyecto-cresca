export interface SignInUser {
    id?: string;
    password: string;
    userRoles?: Array<{
        role: {
            modulo: string;
            rol: string;
        };
    }>;
}
