import { PrimitiveUser } from "../interface/primitive-user";

export class User {
    constructor(private attributes: PrimitiveUser) {}
    
    static create(createUser: {
        userName: string;
        email: string;
        tipoDocumento: string;
        cedula: string;
        password: string;
    }): User {
        return new User({
            ...createUser,
        });
    }

    update(updateUser: {
        userName?: string;
        email?: string;
        tipoDocumento?: string;
        cedula?: string;
        password?: string;
    }): void {
        if(updateUser.userName) {
            this.attributes.userName = updateUser.userName;
        }
        if(updateUser.email) {
            this.attributes.email = updateUser.email;
        }
        if(updateUser.tipoDocumento) {
            this.attributes.tipoDocumento = updateUser.tipoDocumento;
        }
        if(updateUser.cedula) {
            this.attributes.cedula = updateUser.cedula;
        }
        if(updateUser.password) {
            this.attributes.password = updateUser.password;
        }
    }

    toValue(): PrimitiveUser {
        return this.attributes;
    }
}