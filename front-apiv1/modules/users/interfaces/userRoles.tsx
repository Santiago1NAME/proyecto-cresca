interface UserRole {
    id: string;
    idUser: string;
    idRol: string;
    role: {
        id: string;
        modulo: string;
        rol: string;
    };
}

export default UserRole;