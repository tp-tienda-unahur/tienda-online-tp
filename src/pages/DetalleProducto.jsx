import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productos } from '../data/productos';
import { useFavoritos } from '../context/FavoritosContext';

// vista de los detalle de cada producto
function DetalleProducto({ agregarAlCarrito, carrito = [] }) {
  const { id } = useParams();
  const [tallaElegida, setTallaElegida] = useState('');

  // Hook para manejar favoritos
  const { esFavorito, toggleFavorito } = useFavoritos();
  const esFav = esFavorito(parseInt(id));

  const producto = productos.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (producto) {
      document.title = `HurlingSports | ${producto.nombre}`;
    }
    return () => {
      document.title = 'HurlingSports';
    };
  }, [producto]);

  // Si el id no corresponde a ningún producto, muestra error 
  if (!producto) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
          No se encontró el producto con ID <strong>{id}</strong>.
        </p>
        <Link
          to="/productos"
          className="inline-block border border-black dark:border-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 text-black dark:text-white"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const sinStock = producto.tallas.every((t) => t.stock === 0);

  const cantidadEnCarrito = tallaElegida
    ? (carrito.find(i => i.id === producto.id && i.talla === tallaElegida)?.cantidad ?? 0)
    : 0;
  const stockTalleElegida = tallaElegida
    ? (producto.tallas.find(t => t.numero === tallaElegida)?.stock ?? 0)
    : 0;
  const stockAgotadoEnCarrito = tallaElegida && cantidadEnCarrito >= stockTalleElegida;

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <nav className="mb-8 text-sm text-gray-400">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/productos" className="hover:text-black dark:hover:text-white transition-colors">Productos</Link>
          <span className="mx-2">/</span>
          <span className="text-black dark:text-white font-medium">{producto.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="border border-black dark:border-white overflow-hidden relative" style={{ minHeight: '480px' }}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-full object-cover"
              style={{ minHeight: '480px' }}
            />
            {/* Botón de favoritos */}
            <button
              onClick={() => toggleFavorito(producto)}
              className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center transition-all duration-300 ${esFav ? 'text-red-500 scale-110' : 'text-white hover:text-red-500'}`}
              aria-label={esFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={esFav ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 drop-shadow-lg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              {/* categoría y estado de stock */}
              <div className="flex gap-3 mb-4 flex-wrap">
                <span className="border border-black dark:border-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {producto.categoria}
                </span>
                {sinStock ? (
                  <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Sin stock
                  </span>
                ) : (
                  <span className="border border-black dark:border-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Talles disponibles
                  </span>
                )}
              </div>

              {/* nombre del producto, precio, descripción completa */}
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">
                {producto.marca}
              </p>
              <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-4">
                {producto.nombre}
              </h1>

              <p className="text-3xl font-black mb-6">
                ${producto.precio.toLocaleString('es-AR')}
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {producto.descripcionCompleta}
              </p>

              {/* stock disponible" — talles clickeables */}
              {/* Al hacer click en un talle con stock se guarda en tallaElegida */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider mb-3">
                  Tallas disponibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {producto.tallas.map((talla) => (
                    <span
                      key={talla.numero}
                      onClick={() => talla.stock > 0 && setTallaElegida(talla.numero)}
                      className={`w-12 h-10 flex items-center justify-center text-sm font-medium transition-all duration-200 border ${
                        talla.stock === 0
                          ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed line-through'
                          : tallaElegida === talla.numero
                          ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white cursor-pointer'
                          : 'border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black cursor-pointer text-black dark:text-white'
                      }`}
                    >
                      {talla.numero}
                    </span>
                  ))}
                </div>
                {tallaElegida && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                    Stock disponible:{' '}
                    <span className={`font-bold ${stockAgotadoEnCarrito ? 'text-red-500' : 'text-black dark:text-white'}`}>
                      {stockTalleElegida - cantidadEnCarrito} {stockTalleElegida - cantidadEnCarrito === 1 ? 'unidad' : 'unidades'}
                    </span>
                    {cantidadEnCarrito > 0 && (
                      <span className="text-gray-400 ml-1">({cantidadEnCarrito} en tu carrito)</span>
                    )}
                  </p>
                )}
              </div>

              {/* características principales */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider mb-3">
                  Características
                </p>
                <ul className="space-y-1">
                  {producto.caracteristicas.map((car, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="text-black dark:text-white font-bold mt-0.5">—</span>
                      {car}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* botón para agregar al carrito y botón para volver al catálogo */}
            <div className="flex gap-4 flex-wrap">
              {/* Deshabilitado si no hay stock o no se eligió talle */}
              <button
                disabled={sinStock || !tallaElegida || stockAgotadoEnCarrito}
                onClick={() => {
                  agregarAlCarrito({ ...producto, talla: tallaElegida });
                  setTallaElegida('');
                }}
                className={`flex-1 min-w-[160px] py-4 font-bold uppercase tracking-wider text-sm transition-all duration-200 ${
                  sinStock || !tallaElegida || stockAgotadoEnCarrito
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white border border-black dark:border-white'
                }`}
              >
                {sinStock ? 'Sin stock' : !tallaElegida ? 'Elegí un talle' : stockAgotadoEnCarrito ? 'Stock agotado' : 'Agregar al carrito'}
              </button>

              <Link
                to="/productos"
                className="flex-1 min-w-[160px] py-4 text-center font-bold uppercase tracking-wider text-sm border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 text-black dark:text-white"
              >
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
