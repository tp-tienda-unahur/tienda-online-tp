import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-black py-12 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-xl font-black text-black mb-4">HurlingSports</h3>
          <p className="text-gray-500 text-sm max-w-xs">
            Diseños seleccionados y colecciones globales premium al alcance de tus pasos.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm">
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
        </div>

        <div>
          <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">Redes</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-gray-500 hover:text-black transition-colors duration-200">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-black transition-colors duration-200">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-black transition-colors duration-200">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-gray-200 mt-8 pt-6 text-center">
        <p className="text-gray-400 text-xs">
          © {new Date().getFullYear()} HurlingSports Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;