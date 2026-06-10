import { useState } from 'react';
import { Link } from 'react-router-dom';

// opciones del campo "Método de entrega"
const METODOS_ENTREGA = ['Envío a domicilio', 'Retiro en local'];

// Formulario de compra o contacto
function Contacto({ totalItems, vaciarCarrito }) {
  // "Manejo de estado con useState" para cada campo del formulario
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    metodoEntrega: '',
    mensaje: '',
  });

  // Estado para almacenar los mensajes de error de cada campo
  const [errores, setErrores] = useState({});

  // Estado que controla si se muestra la pantalla de confirmación
  const [confirmado, setConfirmado] = useState(false);

  // actualiza el campo correspondiente y limpia su error
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  }

  // validaciones simples
  // Devuelve un objeto con los errores encontrados; si está vacío, el formulario es válido
  function validar() {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!form.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nuevosErrores.email = 'El email no tiene un formato válido.';
    }
    if (!form.telefono.trim()) nuevosErrores.telefono = 'El teléfono es obligatorio.';
    if (!form.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria.';
    if (!form.metodoEntrega) nuevosErrores.metodoEntrega = 'Seleccioná un método de entrega.';
    return nuevosErrores;
  }

  // el carrito está vacío
  function handleSubmit(e) {
    e.preventDefault();
    if (totalItems === 0) return;
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    // Confirmar la compra de manera simulada 
    setConfirmado(true);
    vaciarCarrito();
  }

  // pantalla de confirmación simulada que se muestra al enviar el formulario
  // Usa los datos del formulario (nombre, email) para personalizar el mensaje
  if (confirmado) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4 text-black dark:text-white">¡Compra confirmada!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          Gracias por tu compra, <strong>{form.nombre}</strong>.
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Te contactaremos a <strong>{form.email}</strong> con los detalles del pedido.
        </p>
        <Link
          to="/productos"
          className="inline-block bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider px-8 py-4 border border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-200"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <div className="mb-8 border-b border-black dark:border-white pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight">Finalizar compra</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Completá tus datos para confirmar el pedido.</p>
        </div>

        {/* no permitir confirmar si el carrito está vacio */}
        {totalItems === 0 && (
          <div className="border border-black dark:border-white bg-gray-50 dark:bg-gray-800 p-4 mb-6 text-center">
            <p className="text-sm font-bold uppercase tracking-wider">Tu carrito está vacío.</p>
            <Link
              to="/productos"
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors underline mt-1 inline-block"
            >
              Ir al catálogo
            </Link>
          </div>
        )}

        {/* formulario controlado con React */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Nombre y apellido
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={`border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-black dark:text-white ${
                errores.nombre ? 'border-red-500' : 'border-black dark:border-white'
              }`}
            />
            {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-black dark:text-white ${
                errores.email ? 'border-red-500' : 'border-black dark:border-white'
              }`}
            />
            {errores.email && <p className="text-red-500 text-xs mt-1">{errores.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className={`border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-black dark:text-white ${
                errores.telefono ? 'border-red-500' : 'border-black dark:border-white'
              }`}
            />
            {errores.telefono && <p className="text-red-500 text-xs mt-1">{errores.telefono}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Dirección o localidad
            </label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              className={`border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-black dark:text-white ${
                errores.direccion ? 'border-red-500' : 'border-black dark:border-white'
              }`}
            />
            {errores.direccion && <p className="text-red-500 text-xs mt-1">{errores.direccion}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Método de entrega
            </label>
            <select
              name="metodoEntrega"
              value={form.metodoEntrega}
              onChange={handleChange}
              className={`border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-black dark:text-white ${
                errores.metodoEntrega ? 'border-red-500' : 'border-black dark:border-white'
              }`}
            >
              <option value="">Seleccioná una opción</option>
              {METODOS_ENTREGA.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            {errores.metodoEntrega && (
              <p className="text-red-500 text-xs mt-1">{errores.metodoEntrega}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Mensaje o aclaración{' '}
              <span className="font-normal normal-case text-gray-400">(opcional)</span>
            </label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows={3}
              className="border border-black dark:border-white px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/*  botón deshabilitado si el carrito está vacío */}
          <button
            type="submit"
            disabled={totalItems === 0}
            className={`py-4 font-bold uppercase tracking-wider text-sm transition-all duration-200 ${
              totalItems === 0
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white border border-black dark:border-white'
            }`}
          >
            {totalItems === 0 ? 'Carrito vacío' : 'Confirmar compra'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;