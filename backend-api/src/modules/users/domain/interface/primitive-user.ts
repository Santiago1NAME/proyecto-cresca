export interface PrimitiveUser {
    id?: string;
    userName: string;
    email: string;
    tipoDocumento: string;
    cedula: string;
    password: string;
    userRoles?: Array<{
        role: {
            id: string;
            modulo: string;
            rol: string;
        };
    }>;
}