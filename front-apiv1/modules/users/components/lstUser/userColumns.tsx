import { Pencil, Trash } from "lucide-react";
import ToolTipTableOptions from "@/components/tables/tooltipTable";
import { ColumnDef } from "@/components/tables/DataTable";

type User = {
    id: number;
    userName: string;
    email: string;
    tipoDocumento: string;
    cedula: string;
};

export const getUserColumns = (
    onDelete: (id: number) => void
): ColumnDef<User>[] => [
    { header: "Nombre",         accessor: "userName"      },
    { header: "Email",          accessor: "email"         },
    { header: "Tipo documento", accessor: "tipoDocumento" },
    { header: "Cédula",         accessor: "cedula"        },
    {
        header: "Acciones",
        accessor: (user) => (
            <div className="flex gap-2">
                <ToolTipTableOptions userId={user.id} tittle="Editar usuario" side="left" className="p-1 rounded-lg hover:bg-blue-500 hover:text-white">
                    <Pencil />
                </ToolTipTableOptions>
                <ToolTipTableOptions
                    userId={user.id}
                    tittle="Borrar usuario"
                    side="right"
                    className="p-1 rounded-lg hover:bg-red-500 hover:text-white"
                    onClick={() => onDelete(user.id)} 
                >
                    <Trash />
                </ToolTipTableOptions>
            </div>
        ),
    },
];