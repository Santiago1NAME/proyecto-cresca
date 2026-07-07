const AccessDenied = ({ message }: { message: string }) => {
    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold tracking-tight text-gray-700">{ message }</h1>
            <p>Contacta con el administrador para obtener acceso</p>
        </div>
    )
}

export default AccessDenied;