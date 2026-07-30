"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloatingInput } from "@/components/ui/floating-input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import FloatingSelect from "@/components/ui/floating-select";
import { editUserSchema } from "@/schemas/editUser.schema";
import { FieldError } from "@/components/ui/field";
import requestFetch from "@/core/services/requestPost";
import { buildModifiedPayload } from "./helpers/editUser.helper";
import { getToken } from "@/core/actions/auth";
import { toast } from "sonner";
import { redirect, RedirectType } from "next/navigation";
import Link from "next/link";

const options = [
    { value: "cc", label: "Cédula de ciudadanía" },
    { value: "ce", label: "Cédula de extranjería" },
    { value: "pa", label: "Pasaporte" },
];

const EditFormClient = ({ idUser, defaultValues, isEdit }: { idUser:number, defaultValues: any, isEdit: boolean }) => {
    const form = useForm({
        resolver: zodResolver(editUserSchema),
        defaultValues,
    });

    const { dirtyFields } = form.formState;

    const handdlerSubmit = async (data: any) => {
        const payload = buildModifiedPayload(data, dirtyFields)
        
        if(Object.keys(payload).length === 0){
            toast.error("No se actualizó ningún campo.", { position: "bottom-right" });
            return;
        }

        const token = await getToken();

        const response = await requestFetch(payload, `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${ idUser }`, "PATCH", { token: token || "" });

        if (response.error) {
            toast.error(response.message, { position: "bottom-right" });
            return;
        }

        toast.success(response.data.message, { position: "bottom-right" });

        redirect(`/dashboard/users/${idUser}`, RedirectType.push)
    }

    return (
        <form onSubmit={form.handleSubmit((data) => handdlerSubmit(data))}>
            <div className="flex gap-2 items-center my-2">
                <Image src="/email.svg" alt="User Image" width={24} height={24} />
                <h2 className="text-lg font-semibold text-gray-700">Datos basicos</h2>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 my-4">
                <Controller className="w-full" name="firstName" control={form.control} render={({field, fieldState}) => (
                    <div className="flex-col">
                        <FloatingInput id="firstName" type="text" label="Primer nombre" iconRight={false} field={field} fieldState={fieldState} isEdit={isEdit} />
                        {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="relative inline-block" />
                            )}
                    </div>
                )}>
                </Controller>
                <Controller className="w-full" name="secondName" control={form.control} render={({field, fieldState}) => (
                    <FloatingInput id="secondName" type="text" label="Segundo nombre" iconRight={false} field={field} fieldState={fieldState} isEdit={isEdit} />
                )}>
                </Controller>
                <Controller className="w-full" name="firstLastName" control={form.control} render={({field, fieldState}) => (
                    <div className="flex-col">
                        <FloatingInput id="firstLastName" type="text" label="Primer apellido" iconRight={false} field={field} fieldState={fieldState} isEdit={isEdit} />
                        {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="relative inline-block" />
                            )}
                    </div>
                )}>
                </Controller>
                <Controller className="w-full" name="secondLastName" control={form.control} render={({field, fieldState}) => (
                    <FloatingInput id="secondLastName" type="text" label="Segundo apellido" iconRight={false} field={field} fieldState={fieldState} isEdit={isEdit} />
                )}>
                </Controller>
                <div className="col-span-2">
                    <Controller name="email" control={form.control} render={({field, fieldState}) => (
                        <div className="flex-col">
                            <FloatingInput id="email" type="text" label="Correo electrónico" iconRight={false} field={field} fieldState={fieldState} isEdit={isEdit} />
                            {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} className="relative inline-block" />
                                )}
                        </div>
                    )}>
                    </Controller>
                </div>
                <Controller className="w-full" name="typeDoc" control={form.control} render={({field, fieldState}) => (
                    <div className="flex-col">
                        <FloatingSelect id="typeDoc" label="Tipo de documento" icon="/email.svg" iconRight={false} field={field} fieldState={fieldState} options={options} isEdit={isEdit} />
                        {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="relative inline-block" />
                            )}
                    </div>
                )}>
                </Controller>
                <Controller className="w-full" name="numDoc" control={form.control} render={({field, fieldState}) => (
                    <div className="flex-col">
                        <FloatingInput id="numDoc" type="text" label="Número de documento" iconRight={false} field={field} fieldState={fieldState} isEdit={isEdit} />
                        {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="relative inline-block" />
                            )}
                    </div>
                )}>
                </Controller>
            </div>
            <Separator />
            { !isEdit && (
                <div className="flex justify-center">
                    <Link className="bg-gray-200 text-gray-700 mt-2 p-2 rounded hover:bg-gray-300 mr-3" href={ `/dashboard/users/${ idUser }` }>Cancelar</Link>
                    <button type="submit" className="bg-blue-500 text-white mt-2 p-2 rounded hover:bg-blue-600">Guardar</button>
                </div>
            )}
        </form>
    );
};

export default EditFormClient;