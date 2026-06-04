// componente que representa un ítem dentro del carrito
// Muestra: nombre, precio por unidad, cantidad, subtotal y controles de edición
function CarritoItem({ item, aumentarCantidad, disminuirCantidad, eliminarDelCarrito }) {
  return (
    <div className="flex items-center gap-4 border-b border-black dark:border-white py-6">
      <img
        src={item.imagen}
        alt={item.nombre}
        className="w-20 h-20 object-cover border border-black dark:border-white flex-shrink-0"
      />

      <div className="flex-grow min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wider">{item.marca}</p>
        <h3 className="font-bold uppercase text-sm leading-tight text-black dark:text-white">{item.nombre}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Talle: {item.talla}</p>
        <p className="text-sm font-black mt-1 text-black dark:text-white">${item.precio.toLocaleString('es-AR')}</p>
      </div>

      {/* Aumentar o disminuir cantidades */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => disminuirCantidad(item.id, item.talla)}
          className="w-8 h-8 border border-black dark:border-white flex items-center justify-center font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 text-black dark:text-white"
        >
          −
        </button>
        <span className="w-8 text-center font-bold text-sm text-black dark:text-white">{item.cantidad}</span>
        <button
          onClick={() => aumentarCantidad(item.id, item.talla)}
          className="w-8 h-8 border border-black dark:border-white flex items-center justify-center font-bold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 text-black dark:text-white"
        >
          +
        </button>
      </div>

      <div className="text-right flex-shrink-0 min-w-[100px]">
        <p className="font-black text-black dark:text-white">${(item.precio * item.cantidad).toLocaleString('es-AR')}</p>
        <button
          onClick={() => eliminarDelCarrito(item.id, item.talla)}
          className="text-xs text-gray-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider mt-1"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CarritoItem;
