import { Link } from 'react-router-dom';

const Nosotros = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      
      <section className="container mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Somos una tienda de zapatillas premium apasionada por la cultura sneaker, el diseño urbano y el deporte. Desde Hurlingham, Buenos Aires, seleccionamos los mejores modelos y marcas del mundo para ofrecerte calidad, estilo y confort en cada paso.
          </p>
        </div>
      </section>

      {/* Sección Historia */}
      <section className="border-t border-black dark:border-white bg-white dark:bg-gray-900 py-20">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"
              alt="Nuestra tienda"
              className="w-full h-[400px] object-cover border border-black dark:border-white grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="lg:w-1/2 flex flex-col items-start gap-4">
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">
              Nuestra Historia
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              HurlingSports nació en 2018 de la pasión por las zapatillas y la cultura urbana. 
              Lo que empezó como un pequeño emprendimiento entre amigos, hoy es una referencia 
              en el mercado de calzado premium.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Trabajamos directamente con las mejores marcas del mundo para traerte modelos 
              exclusivos y ediciones limitadas que no encontrás en otro lado.
            </p>
          </div>
        </div>
      </section>

      {/* Sección Valores */}
      <section className="border-t border-black dark:border-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-center mb-12">
            Nuestros Valores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Valor 1 */}
            <div className="border border-black dark:border-white p-8 text-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 group">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-bold uppercase tracking-wider mb-2">Calidad</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                Solo trabajamos con marcas reconocidas mundialmente.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="border border-black dark:border-white p-8 text-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 group">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold uppercase tracking-wider mb-2">Compromiso</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                Atención personalizada y soporte post-venta.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="border border-black dark:border-white p-8 text-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 group">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold uppercase tracking-wider mb-2">Estilo</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                Una selección de los modelos más emblemáticos del mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Equipo */}
      <section className="border-t border-black dark:border-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-center mb-12">
            Nuestro Equipo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            
            {/* Miembro 1 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 border border-black dark:border-white overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                  alt="Miembro del equipo"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wider">Martín Gómez</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Fundador & CEO</p>
            </div>

            {/* Miembro 2 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 border border-black dark:border-white overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
                  alt="Miembro del equipo"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wider">Valentina Bertinat</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Directora Comercial</p>
            </div>

            {/* Miembro 3 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 border border-black dark:border-white overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
                  alt="Miembro del equipo"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wider">Pablo Ruiz</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Jefe de Producto</p>
            </div>

            {/* Miembro 4 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 border border-black dark:border-white overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
                  alt="Miembro del equipo"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wider">Carla Mendez</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Atención al Cliente</p>
            </div>

            {/* Miembro 4 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 border border-black dark:border-white overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1724225618124-0f0d51cf33f4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Miembro del equipo"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wider">Tomas Darielli</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Marketing Manager</p>
            </div>

          </div>
        </div>
      </section>

      {/* Sección CTA */}
      <section className="border-t border-black dark:border-white py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight mb-4">
            ¿Listo para encontrar tu par perfecto?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Explorá nuestra colección de zapatillas y descubrí el estilo que te representa.
          </p>
          <Link
            to="/productos"
            className="inline-block bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider px-8 py-4 border border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-300"
          >
            Ver Catálogo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;