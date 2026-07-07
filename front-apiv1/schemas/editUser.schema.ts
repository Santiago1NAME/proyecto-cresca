import { z } from "zod";

export const editUserSchema = z.object({
    firstName: z.string().min(2, "El primer nombre debe tener al menos 2 caracteres."),
    secondName: z.string().optional(),
    firstLastName: z.string().min(2, "El primer apellido debe tener al menos 2 caracteres."),
    secondLastName: z.string().optional(),
    email: z.string().email("El correo electrónico no es válido."),
    typeDoc: z.enum(["cc", "ce", "pa"], "Seleccione un tipo de documento válido."),
    numDoc: z.string().min(5, "El número de documento debe tener al menos 5 caracteres."),
});