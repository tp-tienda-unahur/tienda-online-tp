import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { productos } from '../data/productos';

function DetalleProducto() {
  const { id } = useParams();

  const producto = productos.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (producto) {
      document.title = `HurlingSports | ${producto.nombre}`;
    }
    return () => {
      document.title = 'HurlingSports';
    };
  }, [producto]);

  if (!producto) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-gray-500 text-lg mb-6">
          No se encontró el producto con ID <strong>{id}</strong>.
        </p>
        <Link
          to="/productos"
          className="inline-block border border-black px-6 py-3 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const sinStock = producto.stock === 0;

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/productos" className="hover:text-black transition-colors">Productos</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">{producto.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Imagen */}
          <div className="border border-black overflow-hidden" style={{ minHeight: '480px' }}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-full object-cover"
              style={{ minHeight: '480px' }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex gap-3 mb-4 flex-wrap">
                <span className="border border-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {producto.categoria}
                </span>
                {sinStock ? (
                  <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Sin stock
                  </span>
                ) : (
                  <span className="border border-black px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Stock: {producto.stock} unidades
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">
                {producto.marca}
              </p>
              <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-4">
                {producto.nombre}
              </h1>

              <p className="text-3xl font-black mb-6">
                ${producto.precio.toLocaleString('es-AR')}
              </p>

              <p className="text-gray-600 leading-relaxed mb-8">
                {producto.descripcionCompleta}
              </p>

              {/* Tallas */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider mb-3">
                  Tallas disponibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {producto.tallas.map((talla) => (
                    <span
                      key={talla}
                      className="border border-black w-12 h-10 flex items-center justify-center text-sm font-medium hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      {talla}
                    </span>
                  ))}
                </div>
              </div>

              {/* Características */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider mb-3">
                  Características
                </p>
                <ul className="space-y-1">
                  {producto.caracteristicas.map((car, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-black font-bold mt-0.5">—</span>
                      {car}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 flex-wrap">
              <button
                disabled={sinStock}
                className={`flex-1 min-w-[160px] py-4 font-bold uppercase tracking-wider text-sm transition-all duration-200 ${
                  sinStock
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-white hover:text-black border border-black'
                }`}
              >
                {sinStock ? 'Sin stock' : 'Agregar al carrito'}
              </button>

              <Link
                to="/productos"
                className="flex-1 min-w-[160px] py-4 text-center font-bold uppercase tracking-wider text-sm border border-black hover:bg-black hover:text-white transition-all duration-200"
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
