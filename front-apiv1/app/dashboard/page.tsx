import Link from "next/link";

const DashboardPage = () => {

    return (
        <>
            <h1>Dashboard</h1>
            <Link href="/dashboard/users/">Editar</Link>
        </>
    );
};

export default DashboardPage;