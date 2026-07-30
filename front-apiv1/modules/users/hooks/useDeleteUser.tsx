import { useState } from "react";
import { toast } from "sonner";
import requestDelete from "@/core/services/requestDelete";
import { getToken } from "@/core/actions/auth";

export const useDeleteUser = (onSuccess: () => void) => {
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const confirmDelete = async () => {
        if (!userToDelete) return;
        setLoading(true);
        try {
            const token = await getToken();
            await requestDelete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userToDelete}`,
                { token: token || "" }
            );
            toast.success("Usuario eliminado correctamente");
            onSuccess(); // recarga la tabla
        } catch {
            toast.error("Error al eliminar el usuario");
        } finally {
            setLoading(false);
            setUserToDelete(null);
        }
    };

    return {
        userToDelete,
        setUserToDelete,
        confirmDelete,
        loading,
        isOpen: !!userToDelete,
        onClose: () => setUserToDelete(null),
    };
};