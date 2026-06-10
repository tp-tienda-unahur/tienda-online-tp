import { useState } from 'react';
import { productos } from '../data/productos';
import ProductoCard from '../components/ProductoCard';

// categorías disponibles de las zapas
const CATEGORIAS = ['Todas', 'Urbana', 'Running', 'Tenis'];

// catalogo 
// Recibe agregarAlCarrito desde App.jsx para pasársela a cada ProductoCard
function Productos({ agregarAlCarrito, carrito = [] }) {
  // las 3 funcionalidades de filtrado/ordenamiento
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
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="container mx-auto px-6 py-12">

        <div className="mb-8 border-b border-black dark:border-white pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight">Catálogo</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* controles de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />

          {/* Filtro por categoría */}
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="border border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Ordenamiento por precio ascendente o descendente */}
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="border border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          >
            <option value="ninguno">Sin orden</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>

        {/* Mensaje cuando ningún producto coincide con los filtros */}
        {productosFiltrados.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-20">
            No se encontraron productos.
          </p>
        )}

        {/* Renderizado de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
              carrito={carrito}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productos;
