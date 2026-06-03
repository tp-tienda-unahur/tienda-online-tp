import { Link } from 'react-router-dom';

// CONSIGNA REQ. 7 — "barra de navegación visible y clara"
// Recibe totalItems desde App.jsx para mostrar el contador del carrito en tiempo real
const Navbar = ({ totalItems }) => {
  return (
    <nav className="bg-white border-b border-black sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-black tracking-tighter">
          HurlingSports
        </Link>

        {/* CONSIGNA REQ. 7 — links a: Inicio, Productos, Contacto */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link to="/" className="text-gray-500 hover:text-black transition-colors duration-200">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos" className="text-gray-500 hover:text-black transition-colors duration-200">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="text-gray-500 hover:text-black transition-colors duration-200">
              Contacto
            </Link>
          </li>
        </ul>

        {/* CONSIGNA REQ. 7 — ícono del carrito con badge que muestra totalItems */}
        {/* totalItems viene de App.jsx y se actualiza cada vez que se agrega o quita un producto */}
        <Link to="/carrito" className="relative p-2 text-black hover:scale-105 transition-transform" aria-label="Carrito">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
            {totalItems}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;