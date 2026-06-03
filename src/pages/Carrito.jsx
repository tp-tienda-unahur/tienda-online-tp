import { Link } from 'react-router-dom';
import CarritoItem from '../components/CarritoItem';

// CONSIGNA REQ. 4 — página del carrito de compras
// Recibe el array carrito y las 3 funciones de manejo desde App.jsx via props
function Carrito({ carrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad }) {
  // CONSIGNA REQ. 4 — "Mostrar la cantidad total de productos"
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // CONSIGNA REQ. 4 — "Calcular el total general" (suma de precio × cantidad de cada ítem)
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // CONSIGNA REQ. 4 — estado vacío: si no hay productos se muestra mensaje con link al catálogo
  if (carrito.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Tu carrito</h1>
        <p className="text-gray-500 mb-8">No tenés productos en el carrito.</p>
        <Link
          to="/productos"
          className="inline-block border border-black px-6 py-3 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 border-b border-black pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight">Tu carrito</h1>
          {/* CONSIGNA REQ. 4 — "Mostrar la cantidad total de productos" */}
          <p className="text-gray-500 mt-1">
            {totalItems} producto{totalItems !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Lista de ítems: usa .map() sobre el array carrito — CONSIGNA REQ. técnico */}
          {/* Cada CarritoItem recibe el ítem y las funciones para modificarlo */}
          <div className="lg:col-span-2">
            {carrito.map((item) => (
              <CarritoItem
                key={`${item.id}-${item.talla}`}
                item={item}
                aumentarCantidad={aumentarCantidad}
                disminuirCantidad={disminuirCantidad}
                eliminarDelCarrito={eliminarDelCarrito}
              />
            ))}
          </div>

          {/* Panel de resumen sticky — muestra subtotal y total general */}
          <div className="mt-8 lg:mt-0">
            <div className="border border-black p-6 sticky top-24">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4">Resumen</h2>

              <div className="flex justify-between mb-2 text-sm text-gray-500">
                <span>Subtotal ({totalItems} producto{totalItems !== 1 ? 's' : ''})</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>

              {/* CONSIGNA REQ. 4 — "Calcular el total general" */}
              <div className="border-t border-black pt-4 flex justify-between font-black text-lg">
                <span>Total</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>

              {/* CONSIGNA REQ. 4 — "Confirmar la compra" → lleva al formulario de Contacto */}
              <Link
                to="/contacto"
                className="block mt-6 bg-black text-white text-center font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black border border-black transition-all duration-200"
              >
                Finalizar compra
              </Link>

              <Link
                to="/productos"
                className="block mt-3 text-center font-bold uppercase tracking-wider py-3 text-sm text-gray-500 hover:text-black transition-colors"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
