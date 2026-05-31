import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductoCard({ producto, agregarAlCarrito }) {
  const [tallaElegida, setTallaElegida] = useState('');

  const sinStock = producto.tallas.every((t) => t.stock === 0);

  function handleAgregar() {
    if (!tallaElegida) return;
    if (agregarAlCarrito) {
      agregarAlCarrito({ ...producto, talla: tallaElegida });
    }
    setTallaElegida('');
  }

  return (
    <div className="border border-black flex flex-col group">
      {/* Imagen */}
      <div className="relative overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        {sinStock && (
          <span className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1">
            SIN STOCK
          </span>
        )}
        <span className="absolute top-2 left-2 bg-white text-black text-xs font-bold px-2 py-1 border border-black">
          {producto.categoria}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
          {producto.marca}
        </p>
        <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2">
          {producto.nombre}
        </h3>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2 flex-grow">
          {producto.descripcion}
        </p>

        <div className="mt-auto">
          <p className="font-black text-lg mb-3">
            ${producto.precio.toLocaleString('es-AR')}
          </p>

          {/* Selector de talle — siempre ocupa el mismo espacio */}
          {sinStock ? (
            <div className="h-[38px] mb-2" />
          ) : (
            <select
              value={tallaElegida}
              onChange={(e) => setTallaElegida(e.target.value)}
              className="border border-black px-2 py-2 text-xs w-full mb-2 bg-white focus:outline-none focus:ring-1 focus:ring-black"
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
              className="flex-1 text-center border border-black py-2 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200"
            >
              Ver detalle
            </Link>
            <button
              disabled={sinStock || !tallaElegida}
              onClick={handleAgregar}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                sinStock || !tallaElegida
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-white hover:text-black border border-black'
              }`}
            >
              {sinStock ? 'Sin stock' : 'Agregar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;
