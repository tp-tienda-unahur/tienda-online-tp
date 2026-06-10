import { Link } from 'react-router-dom';
import { useTema } from '../context/TemaContext';
import { useFavoritos } from '../context/FavoritosContext';
import { useEffect, useState } from 'react';

// CONSIGNA REQ. 7 — "barra de navegación visible y clara"
// Recibe totalItems desde App.jsx para mostrar el contador del carrito en tiempo real
const Navbar = ({ totalItems }) => {
  const { oscuro, alternarTema } = useTema();
  const { favoritos } = useFavoritos();
  const [animar, setAnimar] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Animar cuando cambia totalItems
  useEffect(() => {
    if (totalItems > 0) {
      setAnimar(true);
      const timer = setTimeout(() => setAnimar(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <nav className="bg-white dark:bg-black border-b border-black dark:border-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Botón menú móvil */}
          <button
            onClick={() => setMenuAbierto((prev) => !prev)}
            className="md:hidden p-2 text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          >
            {menuAbierto ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
          <Link to="/" className="text-2xl font-black text-black dark:text-white tracking-tighter">
            HurlingSports
          </Link>
        </div>

        {/* CONSIGNA REQ. 7 — links a: Inicio, Productos, Contacto, Nosotros (Bonus) */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/nosotros" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/productos" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
              Contacto
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {/* Botón Modo Oscuro */}
          <button
            onClick={alternarTema}
            className="p-2 text-black dark:text-white hover:scale-105 transition-transform"
            aria-label="Cambiar tema"
          >
            {oscuro ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
          {/* Link a Favoritos con contador */}
          <Link to="/favoritos" className="relative p-2 text-black dark:text-white hover:scale-105 transition-transform" aria-label="Favoritos">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            {favoritos.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white dark:border-black">
                {favoritos.length}
              </span>
            )}
          </Link>

          {/* CONSIGNA REQ. 7 — ícono del carrito con badge que muestra totalItems */}
          {/* totalItems viene de App.jsx y se actualiza cada vez que se agrega o quita un producto */}
          <Link to="/carrito" className="relative p-2 text-black dark:text-white hover:scale-105 transition-transform" aria-label="Carrito">
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
            <span className={`absolute -top-0.5 -right-0.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white dark:border-black transition-transform duration-300 ${animar ? 'scale-125' : 'scale-100'}`}>
              {totalItems}
            </span>
          </Link>
        </div>
      </div>

      {/* Menú Mobile */}
      {menuAbierto && (
        <div className="md:hidden border-t border-black dark:border-white bg-white dark:bg-black px-6 py-4">
          <ul className="flex flex-col gap-3 font-medium">
            <li>
              <Link to="/" onClick={() => setMenuAbierto(false)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/nosotros" onClick={() => setMenuAbierto(false)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/productos" onClick={() => setMenuAbierto(false)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/contacto" onClick={() => setMenuAbierto(false)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;