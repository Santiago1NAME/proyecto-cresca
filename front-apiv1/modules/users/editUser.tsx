import { Card, CardContent } from "@/components/ui/card";
import EditForm from "@/modules/users/components/edit/editForm";

const EditUserMain = async ({ params }: { params: { id: number } }) => {

    const { id } = await params;

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-700">Editar usuario</h1>
                <p>Modifica los datos personales del usuario</p>
            </div>
            <div className="w-full">
                <Card className="p-4">
                    <CardContent>
                        <EditForm idUser={id} isEdit={false} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default EditUserMain;