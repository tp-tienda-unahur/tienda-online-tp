import { useState } from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  const imagenesCarrusel = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  const [imagenActual, setImagenActual] = useState(0);

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev === imagenesCarrusel.length - 1 ? 0 : prev + 1));
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev === 0 ? imagenesCarrusel.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <section className="container mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-80px)]">
        
        <div className="lg:w-1/2 flex flex-col items-start gap-6">
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tight text-black leading-none whitespace-pre-line">
            Las mejores{"\n"}zapatillas, a tu ritmo
          </h1>
          
          <p className="text-lg text-gray-500 max-w-xl leading-relaxed transition-colors duration-200 hover:text-black">
            Descubrí nuestra colección de zapatillas premium de las mejores marcas del mundo. Estilo, comodidad y calidad en cada paso.
          </p>
          
          <Link 
            to="/productos" 
            className="inline-flex items-center gap-3 bg-black text-white font-bold uppercase tracking-wider text-sm py-4 px-8 border border-black hover:bg-white hover:text-black transition-all duration-300 group"
          >
            Ver catálogo 
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        <div className="lg:w-1/2 w-full">
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Zapatillas Premium Banner" 
            className="w-full h-[400px] lg:h-[550px] object-cover border border-black grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </section>

      <section className="border-t border-black bg-white py-20">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="lg:w-1/2 flex flex-col items-start gap-4">
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-black">
              Nuestra historia
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-lg transition-colors duration-200 hover:text-black">
              Nacimos de la pasión por el diseño urbano y la cultura de las zapatillas deportivas. Creemos que cada par cuenta una historia y define tu camino. Seleccionamos minuciosamente colecciones premium internacionales para asegurarte calidad, exclusividad y confort sin importar cuál sea tu ritmo.
            </p>
          </div>

          <div className="lg:w-1/2 w-full relative">
            <div className="relative h-[350px] md:h-[450px] w-full border border-black overflow-hidden">
              <img 
                src={imagenesCarrusel[imagenActual]} 
                alt={`Colección historia ${imagenActual + 1}`} 
                className="w-full h-full object-cover transition-all duration-500 grayscale hover:grayscale-0"
              />

              <button 
                onClick={anteriorImagen}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black text-white border border-black w-10 h-10 flex items-center justify-center font-bold hover:bg-white hover:text-black transition-all z-10"
              >
                ←
              </button>
              <button 
                onClick={siguienteImagen}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-white border border-black w-10 h-10 flex items-center justify-center font-bold hover:bg-white hover:text-black transition-all z-10"
              >
                →
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {imagenesCarrusel.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setImagenActual(index)}
                    className={`w-2 h-2 rounded-full border border-black transition-all ${index === imagenActual ? 'bg-black w-4' : 'bg-white'}`}
                    aria-label={`Ir a la imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Inicio;