import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EditForm from "@/modules/users/components/edit/editForm";
import { getToken } from "@/core/actions/auth";
import requestGet from "@/core/services/requestGet";
import Link from "next/link";

const InfoUser = async ({ params } : { params: { id: number } }) => {

    const { id } = await params;

    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-700">Informacion del usuario</h1>
                    <p>Informacion del usuario seleccionado</p>
                </div>
                <div className="flex gap-2">
                    <Link href={'/dashboard/users/'+ id +'/roles'} className="rounded-md p-2 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800">
                        Roles
                    </Link>
                    <Link href={'/dashboard/users/'+ id +'/edit'} className="rounded-md p-2 bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
                        Editar
                    </Link>
                </div>
            </div>
            <div className="w-full">
                <Card className="p-4">
                    <CardContent>
                        <EditForm idUser={id} isEdit={true} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default InfoUser