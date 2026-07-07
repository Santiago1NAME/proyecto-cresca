import EditUserMain from "@/modules/users/editUser";

const Usuarios = async ({ params }: { params: { id: number } }) => {

    const { id } = await params;

    return (
        <EditUserMain params={params} />
    );
}

export default Usuarios