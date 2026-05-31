import { useState } from 'react';
import { productos } from '../data/productos';
import ProductoCard from '../components/ProductoCard';

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
          {productosFiltrados.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productos;
