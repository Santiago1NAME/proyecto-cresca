import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Roles } from "@/core/data/roles";
import requestGet from "@/core/services/requestGet";
import { getToken } from "@/core/actions/auth";
import UserRole from "@/modules/users/interfaces/userRoles";
import requestFetch from "@/core/services/requestPost";
import { toast } from "sonner";
import { redirect, RedirectType } from "next/navigation";

const calcularSubRoles = (modulos: string[]) => {
    return modulos.reduce((acc, mod) => {
        const found = Roles.find((r) => r.valor === mod);

        if (!found) return acc;

        acc[found.modulo] = Object.fromEntries(
            Object.entries(found.roles).filter(([_, valor]) => valor !== undefined)
        ) as Record<string, string>;

        return acc;
    }, {} as Record<string, Record<string, string>>);
};

export const useRolesUser = (idUser: number) => {
    const [activeModules, setActiveModules] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const form = useForm({ defaultValues: { roles: [] as number[] } });

    const subRoles = useMemo(() => calcularSubRoles(activeModules), [activeModules]);

    const handleSwitch = (valor: string, checked: boolean, fieldOnChange: (v: string[]) => void) => {
        const updatedModules = checked
            ? [...activeModules, valor]
            : activeModules.filter(m => m !== valor);

        setActiveModules(updatedModules);
        const roles = Object.values(calcularSubRoles(updatedModules)).flatMap(subRoles => Object.values(subRoles));

        fieldOnChange(roles);
    };

    const onSubmit = async(data: { roles: number[] }) => {
        const payload = { roles: data.roles };
        const token = await getToken();

        const response = await requestFetch(payload, `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${idUser}/role`, "PATCH", { token: token || "" });
        if (response.error) {
            toast.error(response.message, { position: "bottom-right" });
            return;
        }

        toast.success(response.data.message, { position: "bottom-right" });

        redirect(`/dashboard/users/${idUser}`, RedirectType.push)
    };

    useEffect(() => {
        async function fetchRoles() {
            try {
                const token = await getToken();
                const dataUser = await requestGet(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${idUser}`,
                    { token: token || "" }
                );
                const userRoles: UserRole[] = dataUser.data.user.userRoles;
                const modulos = [...new Set(userRoles.map((r) => r.role.modulo))];
                const ids = userRoles.map((r) => r.role.id);

                setActiveModules(modulos);
                form.setValue("roles", ids);
            } catch {
                setError("Error al cargar los roles del usuario");
            }
        }
        fetchRoles();
    }, [idUser]);

    return { form, subRoles, activeModules, handleSwitch, onSubmit, error };
};