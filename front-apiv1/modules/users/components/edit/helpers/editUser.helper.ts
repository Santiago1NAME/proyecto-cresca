export const buildModifiedPayload = (
    data: any,
    dirtyFields: Record<string, boolean>
) => {
    const modifData = Object.fromEntries(
        Object.entries(data).filter(([key]) => dirtyFields[key])
    );

    const nameFields = ["firstName", "secondName", "firstLastName", "secondLastName"];
    const hasNameChange = nameFields.some(f => modifData[f]);

    if (hasNameChange) {
        const userName = [
            data.firstName,
            data.secondName,
            data.firstLastName,
            data.secondLastName,
        ].filter(Boolean).join(" ");

        nameFields.forEach(f => delete modifData[f]);
        modifData.userName = userName;
    }

    if (modifData.typeDoc) {
        modifData.tipoDocumento = modifData.typeDoc;
        delete modifData.typeDoc;
    }

    if (modifData.numDoc) {
        modifData.cedula = modifData.numDoc;
        delete modifData.numDoc;
    }

    return modifData;
};