"use client";

import { FloatingInput } from "@/components/ui/floating-input";
import { FieldError } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/schemas/login.schema";
import { redirect, RedirectType } from "next/navigation";
import { useTokenStore } from '@/modules/auth/hooks/authToken';
import requestFetch from "@/core/services/requestPost";

const FormLogin = () => {

    const { setToken } = useTokenStore();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginFormValues) {
        const response = await requestFetch(data, "http://localhost:3000/api/v1/auth/login", "POST");
        if (response.error) {
            toast.error(response.message, { position: "bottom-right" });
            return;
        }
        await setToken(response.data.access_token);
        redirect('/dashboard', RedirectType.push);
    }

    return (
        <>
            <h2 className="text-2xl font-semibold mt-10 mb-5 text-center">Iniciar sesión</h2>
            <form id="form-rhf-demo" className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                    <>
                        <FloatingInput id="email" type="text" label="Correo electrónico" icon="/email.svg" iconRight={true} field={field} fieldState={fieldState} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} className="relative inline-block" />
                        )}
                    </>
                )}>
                </Controller>
                <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                    <>
                        <FloatingInput id="password" type="password" label="Contraseña" icon="/pass.svg" iconRight={true} field={field} fieldState={fieldState} />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} className="relative inline-block" />
                        )}
                    </>
                )}>
                </Controller>
                <button type="submit" className="bg-blue-500 text-white mt-2 p-2 rounded hover:bg-blue-600">Continuar</button>
            </form>
        </>
    )
}

export default FormLogin;