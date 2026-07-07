"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import { ConfirmDialog } from "@/components/tables/ConfirmDialog";
import { getUserColumns } from "@/modules/users/components/lstUser/userColumns";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { useDeleteUser } from "@/modules/users/hooks/useDeleteUser";
import { redirect } from "next/navigation";

const LstUsers = () => {
    const { users, page, setPage, setCantItems, loadUsers } = useUsers();
    const { isOpen, loading, setUserToDelete, confirmDelete, onClose } = useDeleteUser(loadUsers);
    const columns = getUserColumns(setUserToDelete);

    console.log(users)
    if (users?.statusCode === 403) {
        redirect("/unauthorized");
    }

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-700">
                    Listado de usuarios
                </h1>
                <p>Administra los usuarios del sistema</p>
            </div>
            <div className="w-full">
                <Card className="p-4">
                    <CardContent>
                        <DataTable
                            data={users?.data?.users ?? []}
                            columns={columns}
                            page={page}
                            totalPages={users?.data?.totalPages ?? 1}
                            onPageChange={setPage}
                            onLimitChange={setCantItems}
                        />
                    </CardContent>
                </Card>
            </div>

            <ConfirmDialog
                open={isOpen}
                title="¿Eliminar usuario?"
                description="Esta acción es permanente y no se puede deshacer."
                loading={loading}
                onConfirm={confirmDelete}
                onCancel={onClose}
            />
        </>
    );
};

export default LstUsers;