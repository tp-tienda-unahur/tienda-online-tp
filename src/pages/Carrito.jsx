import { Link } from 'react-router-dom';
import CarritoItem from '../components/CarritoItem';
import { useState } from 'react';
import { cupones } from '../data/cupones'

// CONSIGNA REQ. 4 — página del carrito de compras
// Recibe el array carrito y las 3 funciones de manejo desde App.jsx via props
function Carrito({ carrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad }) {
  const [cupon, setCupon] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(null);
  const [mensajeCupon, setMensajeCupon] = useState('');
  // CONSIGNA REQ. 4 — "Mostrar la cantidad total de productos"
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // CONSIGNA REQ. 4 — "Calcular el total general" (suma de precio × cantidad de cada ítem)
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const totalConDescuento = cuponAplicado ? total - (total * cuponAplicado.descuento) / 100 : total;

  // CONSIGNA REQ. 4 — estado vacío: si no hay productos se muestra mensaje con link al catálogo
  if (carrito.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4 text-black dark:text-white">Tu carrito</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">No tenés productos en el carrito.</p>
        <Link
          to="/productos"
          className="inline-block border border-black dark:border-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 text-black dark:text-white"
        >
          Ver productos
        </Link>
      </div>
    );
  }

function aplicarCupon() {
  const cuponEncontrado = cupones.find(
    (c) => c.codigo === cupon
  );

  if (!cuponEncontrado) {
    setMensajeCupon("Descuento inexistente");
    return;
  }

  if (cuponAplicado) {
    if (cuponAplicado.codigo === cupon) {
      setMensajeCupon("El descuento ya fue aplicado");
    } else {
      setMensajeCupon("Ya hay un descuento aplicado");
    }
    return;
  }

  setCuponAplicado(cuponEncontrado);
  setMensajeCupon("Cupón aplicado correctamente");
}

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 border-b border-black dark:border-white pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight">Tu carrito</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
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
          {/* Panel de descuento: muestra el input para ingresar el codigo + boton de aplicar */ }
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 text-center">
              ¿Tenés un cupón de descuento?
            </p>
              <input type="text" value={cupon} onChange={(e) => setCupon(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-black dark:border-white bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition"
              />
            <button onClick={aplicarCupon}
            className="w-full mt-3 py-2 text-sm font-bold uppercase tracking-wider border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:opacity-90 active:scale-[0.98]">
              Aplicar
            </button>
            {mensajeCupon && (
            <p className="text-xs text-gray-500 mt-1">
            {mensajeCupon}
            </p>
)}
          </div>

          {/* Panel de resumen sticky — muestra subtotal y total general */}
          <div className="mt-8 lg:mt-0">
            <div className="border border-black dark:border-white p-6 sticky top-24 bg-white dark:bg-gray-800">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-black dark:text-white">Resumen</h2>

              <div className="flex justify-between mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Subtotal ({totalItems} producto{totalItems !== 1 ? 's' : ''})</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>

          {cuponAplicado && (
          <div className="flex justify-between mb-2 text-sm text-green-600 dark:text-green-400">
          <span>
            DESCUENTO "{cuponAplicado.codigo}" APLICADO
          </span>

          <span>
            -${((total * cuponAplicado.descuento) / 100).toLocaleString('es-AR')}
          </span>
        </div>
)}

              <div className="border-t border-black dark:border-white pt-4 flex justify-between font-black text-lg">
                <span>Total</span>
                <span>${totalConDescuento.toLocaleString('es-AR')}</span>
              </div>

              {/* CONSIGNA REQ. 4 — "Confirmar la compra" → lleva al formulario de Contacto */}
              <Link
                to="/contacto"
                className="block mt-6 bg-black dark:bg-white text-white dark:text-black text-center font-bold uppercase tracking-wider py-4 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white border border-black dark:border-white transition-all duration-200"
              >
                Finalizar compra
              </Link>

              <Link
                to="/productos"
                className="block mt-3 text-center font-bold uppercase tracking-wider py-3 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
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
