import { Link } from 'react-router-dom';
/// pestaña de error 404, muestra mensaje de la pag no existe

function NotFound() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-black tracking-tighter mb-4">404</p>
      <h1 className="text-2xl font-black uppercase tracking-tight mb-2">
        Página no encontrada
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        to="/"
        className="inline-block bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider px-8 py-4 border border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
