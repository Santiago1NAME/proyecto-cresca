import InfoUser from "@/modules/users/infoUser";

const Usuarios = async ({ params } : { params: { id: number } }) => {

    const { id } = await params;

    return (
        <InfoUser params={params} />
    );
}

export default Usuarios