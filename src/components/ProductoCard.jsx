import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';

function ProductoCard({ producto, agregarAlCarrito, carrito = [] }) {
  const [tallaElegida, setTallaElegida] = useState('');
  const [agregando, setAgregando] = useState(false);

  // Hook para manejar favoritos
  const { esFavorito, toggleFavorito } = useFavoritos();
  const esFav = esFavorito(producto.id);

  const sinStock = producto.tallas.every((t) => t.stock === 0);

  const tallaNum = tallaElegida ? Number(tallaElegida) : null;
  const stockTalle = tallaNum
    ? (producto.tallas.find(t => t.numero === tallaNum)?.stock ?? 0)
    : 0;
  const cantidadEnCarrito = tallaNum
    ? (carrito.find(i => i.id === producto.id && i.talla === tallaNum)?.cantidad ?? 0)
    : 0;
  const stockAgotadoEnCarrito = tallaNum && cantidadEnCarrito >= stockTalle;

  function handleAgregar() {
    if (!tallaElegida || stockAgotadoEnCarrito) return;
    setAgregando(true);
    if (agregarAlCarrito) {
      agregarAlCarrito({ ...producto, talla: Number(tallaElegida) });
    }
    setTimeout(() => {
      setAgregando(false);
      setTallaElegida('');
    }, 800);
  }

  // Función para agregar/quitar de favoritos
  function handleFavorito(e) {
    e.preventDefault();
    toggleFavorito(producto);
  }

  return (
    <div className="border border-black dark:border-white flex flex-col group bg-white dark:bg-gray-800">
      <div className="relative overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        {sinStock && (
          <span className="absolute top-2 right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1">
            SIN STOCK
          </span>
        )}
        <span className="absolute top-2 left-2 bg-white dark:bg-black text-black dark:text-white text-xs font-bold px-2 py-1 border border-black dark:border-white">
          {producto.categoria}
        </span>
        {/* Botón de favoritos */}
        <button
          onClick={handleFavorito}
          className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center transition-all duration-300 ${sinStock ? 'top-10' : ''} ${esFav ? 'text-red-500 scale-110' : 'text-white hover:text-red-500'}`}
          aria-label={esFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={esFav ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 drop-shadow-lg"
           >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>

      

      {/* Info */}
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

          {/* Selector de talle — siempre ocupa el mismo espacio */}
          {sinStock ? (
            <div className="h-[38px] mb-2" />
          ) : (
            <select
              value={tallaElegida}
              onChange={(e) => setTallaElegida(e.target.value)}
              className="border border-black dark:border-white bg-white dark:bg-gray-700 text-black dark:text-white px-2 py-2 text-xs w-full mb-2 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            >
              <option value="">Elegir talle</option>
              {producto.tallas.map((t) => (
                <option key={t.numero} value={t.numero} disabled={t.stock === 0}>
                  {t.numero}{t.stock === 0 ? ' — sin stock' : ''}
                </option>
              ))}
            </select>
          )}

          <div className="flex gap-2">
            <Link
              to={`/productos/${producto.id}`}
              className="flex-1 text-center border border-black dark:border-white py-2 text-xs font-bold uppercase tracking-wider hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 text-black dark:text-white"
            >
              Ver detalle
            </Link>
            <button
              disabled={sinStock || !tallaElegida || agregando || stockAgotadoEnCarrito}
              onClick={handleAgregar}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 transform ${
                agregando
                  ? 'bg-green-600 text-white scale-105 border border-green-600'
                  : sinStock || !tallaElegida || stockAgotadoEnCarrito
                  ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white border border-black dark:border-white hover:scale-105'
              }`}
            >
              {sinStock ? 'Sin stock' : agregando ? '✓ Agregado' : stockAgotadoEnCarrito ? 'Sin stock' : 'Agregar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;