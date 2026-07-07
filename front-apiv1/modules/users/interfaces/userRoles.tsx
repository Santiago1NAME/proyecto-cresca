interface UserRole {
    id: number;
    idUser: number;
    idRol: number;
    role: {
        id: number;
        modulo: string;
        rol: string;
    };
}

export default UserRole;