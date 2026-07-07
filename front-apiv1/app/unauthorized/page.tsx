const unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Acceso Denegado</h1>
      <p className="text-gray-600">No tienes permiso para acceder a esta página.</p>
    </div>
  );
};

export default unauthorized;