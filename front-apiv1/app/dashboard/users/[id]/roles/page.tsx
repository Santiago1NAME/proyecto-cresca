import RolesMain from "@/modules/users/components/roles/main";

const RolesPage = async ({ params }: { params: any }) => {
    const { id } = await params;
    return (
        <RolesMain params={params} />
    );
};

export default RolesPage;