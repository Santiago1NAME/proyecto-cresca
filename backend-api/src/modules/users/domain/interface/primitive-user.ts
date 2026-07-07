export interface PrimitiveUser {
    id?: string;
    userName: string;
    email: string;
    tipoDocumento: string;
    cedula: string;
    password: string;
    userRoles?: Array<{
        role: {
            modulo: string;
            rol: string;
        };
    }>;
}