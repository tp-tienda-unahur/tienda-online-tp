import { Link } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';

// Página de favoritos — muestra los productos marcados como favoritos
function Favoritos() {
  const { favoritos, eliminarFavorito, vaciarFavoritos } = useFavoritos();

  // Estado vacío: si no hay favoritos se muestra mensaje con link al catálogo
  if (favoritos.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4 text-black dark:text-white">
          Mis Favoritos
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          No tenés productos en favoritos.
        </p>
        <Link
          to="/productos"
          className="inline-block border border-black dark:border-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 text-black dark:text-white"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 border-b border-black dark:border-white pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight">Mis Favoritos</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {favoritos.length} producto{favoritos.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={vaciarFavoritos}
            className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            Vaciar todo
          </button>
        </div>

        {/* Lista de favoritos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoritos.map((producto) => (
            <div
              key={producto.id}
              className="border border-black dark:border-white flex flex-col group bg-white dark:bg-gray-800"
            >
              <div className="relative overflow-hidden">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <span className="absolute top-2 left-2 bg-white dark:bg-black text-black dark:text-white text-xs font-bold px-2 py-1 border border-black dark:border-white">
                  {producto.categoria}
                </span>

                {/* Botón para quitar de favoritos */}
                <button
                  onClick={() => eliminarFavorito(producto.id)}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-red-500 hover:scale-110 transition-transform"
                  aria-label="Quitar de favoritos"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  {producto.marca}
                </p>
                <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2 text-black dark:text-white">
                  {producto.nombre}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 line-clamp-2 flex-grow">
                  {producto.descripcion}
                </p>

                <div className="mt-auto">
                  <p className="font-black text-lg mb-3 text-black dark:text-white">
                    ${producto.precio.toLocaleString('es-AR')}
                  </p>

                  <Link
                    to={`/productos/${producto.id}`}
                    className="block text-center border border-black dark:border-white py-2 text-xs font-bold uppercase tracking-wider hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 text-black dark:text-white"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favoritos;