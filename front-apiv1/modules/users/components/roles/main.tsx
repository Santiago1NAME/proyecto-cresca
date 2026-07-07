import RolesUser from "@/modules/users/components/roles/roles";

const RolesMain = async ({ params }: { params: any }) => {
    const { id } = await params;
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-700">Roles</h1>
                <p>Asignación de roles al usuario</p>
            </div>
            <RolesUser idUser={id} />
        </>
    );
};

export default RolesMain;