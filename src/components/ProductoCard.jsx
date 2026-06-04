import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductoCard({ producto, agregarAlCarrito }) {
  const [tallaElegida, setTallaElegida] = useState('');
  const [agregando, setAgregando] = useState(false);

  const sinStock = producto.tallas.every((t) => t.stock === 0);

  function handleAgregar() {
    if (!tallaElegida) return;
    setAgregando(true);
    if (agregarAlCarrito) {
      agregarAlCarrito({ ...producto, talla: tallaElegida });
    }
    setTimeout(() => {
      setAgregando(false);
      setTallaElegida('');
    }, 800);
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
              disabled={sinStock || !tallaElegida || agregando}
              onClick={handleAgregar}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 transform ${
                agregando
                  ? 'bg-green-600 text-white scale-105 border border-green-600'
                  : sinStock || !tallaElegida
                  ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white border border-black dark:border-white hover:scale-105'
              }`}
            >
              {sinStock ? 'Sin stock' : agregando ? '✓ Agregado' : 'Agregar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;