import { useState } from 'react';
import { Link } from 'react-router-dom';

// CONSIGNA REQ. 6 — opciones del campo "Método de entrega"
const METODOS_ENTREGA = ['Envío a domicilio', 'Retiro en local'];

// CONSIGNA REQ. 6 — "Formulario de compra o contacto"
// Recibe totalItems para bloquear el botón si el carrito está vacío
// Recibe vaciarCarrito para limpiar el carrito al confirmar la compra
function Contacto({ totalItems, vaciarCarrito }) {
  // CONSIGNA REQ. 6 — "Manejo de estado con useState" para cada campo del formulario
  // Campos mínimos requeridos: nombre, email, teléfono, dirección, método de entrega, mensaje (opcional)
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

  // CONSIGNA REQ. 6 — "eventos onChange" — actualiza el campo correspondiente y limpia su error
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  }

  // CONSIGNA REQ. 6 — "validaciones simples"
  // Devuelve un objeto con los errores encontrados; si está vacío, el formulario es válido
  function validar() {
    const nuevosErrores = {};
    // CONSIGNA REQ. 6 — "nombre obligatorio"
    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    // CONSIGNA REQ. 6 — "email obligatorio" y "email con formato válido"
    if (!form.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nuevosErrores.email = 'El email no tiene un formato válido.';
    }
    // CONSIGNA REQ. 6 — "teléfono obligatorio"
    if (!form.telefono.trim()) nuevosErrores.telefono = 'El teléfono es obligatorio.';
    // CONSIGNA REQ. 6 — "dirección o localidad obligatoria"
    if (!form.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria.';
    // Método de entrega obligatorio (campo mínimo de la consigna)
    if (!form.metodoEntrega) nuevosErrores.metodoEntrega = 'Seleccioná un método de entrega.';
    return nuevosErrores;
  }

  // CONSIGNA REQ. 6 — "eventos onSubmit"
  // CONSIGNA REQ. 6 — "no permitir confirmar si el carrito está vacío"
  function handleSubmit(e) {
    e.preventDefault();
    if (totalItems === 0) return;
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    // CONSIGNA REQ. 4 — "Confirmar la compra de manera simulada — mensaje en pantalla"
    setConfirmado(true);
    // Vacía el carrito en App.jsx al confirmar la compra
    vaciarCarrito();
  }

  // CONSIGNA REQ. 4 — pantalla de confirmación simulada que se muestra al enviar el formulario
  // Usa los datos del formulario (nombre, email) para personalizar el mensaje
  if (confirmado) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4">¡Compra confirmada!</h1>
        <p className="text-gray-500 mb-2">
          Gracias por tu compra, <strong>{form.nombre}</strong>.
        </p>
        <p className="text-gray-500 mb-8">
          Te contactaremos a <strong>{form.email}</strong> con los detalles del pedido.
        </p>
        <Link
          to="/productos"
          className="inline-block bg-black text-white font-bold uppercase tracking-wider px-8 py-4 border border-black hover:bg-white hover:text-black transition-all duration-200"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <div className="mb-8 border-b border-black pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight">Finalizar compra</h1>
          <p className="text-gray-500 mt-1">Completá tus datos para confirmar el pedido.</p>
        </div>

        {/* CONSIGNA REQ. 6 — "no permitir confirmar si el carrito está vacío" */}
        {/* Aviso visible cuando se accede a /contacto sin productos en el carrito */}
        {totalItems === 0 && (
          <div className="border border-black bg-gray-50 p-4 mb-6 text-center">
            <p className="text-sm font-bold uppercase tracking-wider">Tu carrito está vacío.</p>
            <Link
              to="/productos"
              className="text-xs text-gray-500 hover:text-black transition-colors underline mt-1 inline-block"
            >
              Ir al catálogo
            </Link>
          </div>
        )}

        {/* CONSIGNA REQ. 6 — "formulario controlado con React" */}
        {/* Cada campo usa value + onChange para mantener el estado sincronizado */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* CONSIGNA REQ. 6 — campo: nombre y apellido (obligatorio) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Nombre y apellido
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={`border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black ${
                errores.nombre ? 'border-red-500' : 'border-black'
              }`}
            />
            {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
          </div>

          {/* CONSIGNA REQ. 6 — campo: email (obligatorio + formato válido) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black ${
                errores.email ? 'border-red-500' : 'border-black'
              }`}
            />
            {errores.email && <p className="text-red-500 text-xs mt-1">{errores.email}</p>}
          </div>

          {/* CONSIGNA REQ. 6 — campo: teléfono (obligatorio) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className={`border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black ${
                errores.telefono ? 'border-red-500' : 'border-black'
              }`}
            />
            {errores.telefono && <p className="text-red-500 text-xs mt-1">{errores.telefono}</p>}
          </div>

          {/* CONSIGNA REQ. 6 — campo: dirección o localidad (obligatorio) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Dirección o localidad
            </label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              className={`border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black ${
                errores.direccion ? 'border-red-500' : 'border-black'
              }`}
            />
            {errores.direccion && <p className="text-red-500 text-xs mt-1">{errores.direccion}</p>}
          </div>

          {/* CONSIGNA REQ. 6 — campo: método de entrega (obligatorio) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Método de entrega
            </label>
            <select
              name="metodoEntrega"
              value={form.metodoEntrega}
              onChange={handleChange}
              className={`border px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black bg-white ${
                errores.metodoEntrega ? 'border-red-500' : 'border-black'
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

          {/* CONSIGNA REQ. 6 — campo: mensaje o aclaración (opcional) */}
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
              className="border border-black px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          {/* CONSIGNA REQ. 6 — botón deshabilitado si el carrito está vacío */}
          {/* Al hacer submit ejecuta handleSubmit que valida y confirma la compra */}
          <button
            type="submit"
            disabled={totalItems === 0}
            className={`py-4 font-bold uppercase tracking-wider text-sm transition-all duration-200 ${
              totalItems === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-white hover:text-black border border-black'
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
