export class UserHasRelationsException extends Error{
    constructor(){
        super("No se puede eliminar el usuario por que tienes roles asociados");
        this.name = "UserHasRelationsException"
    }
}