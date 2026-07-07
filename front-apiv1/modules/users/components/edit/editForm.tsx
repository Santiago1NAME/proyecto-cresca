import { getToken } from "@/core/actions/auth";
import requestGet from "@/core/services/requestGet";
import EditFormClient from "./editFormClient";
import { redirect } from "next/navigation";

const EditForm = async ({ idUser, isEdit }: { idUser: number; isEdit: boolean }) => {
    const token = await getToken();
    const user = await requestGet(`http://localhost:3000/api/v1/users/${idUser}`, { token: token || "" });

    if (user.statusCode === 403) {
        redirect("/unauthorized");
    }

    const dataUser = user.data?.user;
    const nameUser = dataUser.userName.split(" ") || [];

    const defaultValues = {
        firstName: nameUser[0] || "",
        secondName: nameUser[1] || "",
        firstLastName: nameUser[2] || "",
        secondLastName: nameUser[3] || "",
        email: dataUser.email || "",
        typeDoc: dataUser.tipoDocumento.toLowerCase() || undefined,
        numDoc: dataUser.cedula || "",
    };

    return <EditFormClient defaultValues={defaultValues} isEdit={isEdit} idUser={idUser} />;
};

export default EditForm;