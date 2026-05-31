import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productos } from '../data/productos';

const CATEGORIAS = ['Todas', 'Urbana', 'Running', 'Tenis'];

function Productos() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [orden, setOrden] = useState('ninguno');

  const productosFiltrados = productos
    .filter((p) => {
      const coincideNombre = p.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      const coincideCategoria =
        categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada;
      return coincideNombre && coincideCategoria;
    })
    .sort((a, b) => {
      if (orden === 'asc') return a.precio - b.precio;
      if (orden === 'desc') return b.precio - a.precio;
      return 0;
    });

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-6 py-12">

        {/* Título */}
        <div className="mb-8 border-b border-black pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight">Catálogo</h1>
          <p className="text-gray-500 mt-1">
            {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border border-black px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="border border-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="border border-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
          >
            <option value="ninguno">Sin orden</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>

        {/* Sin resultados */}
        {productosFiltrados.length === 0 && (
          <p className="text-gray-500 text-center py-20">
            No se encontraron productos.
          </p>
        )}

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map((producto) => {
            const sinStock = producto.stock === 0;

            return (
              <div
                key={producto.id}
                className="border border-black flex flex-col group"
              >
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

                    <div className="flex gap-2">
                      <Link
                        to={`/productos/${producto.id}`}
                        className="flex-1 text-center border border-black py-2 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200"
                      >
                        Ver detalle
                      </Link>
                      <button
                        disabled={sinStock}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                          sinStock
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
          })}
        </div>
      </div>
    </div>
  );
}

export default Productos;
