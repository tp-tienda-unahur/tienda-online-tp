import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';

function App() {
  // aca vive el estado del carrito, principal donde puede interactuar con todas las paginas que se necesite, laburando desde el estado
  const [carrito, setCarrito] = useState([]);

  // agrega un producto al carrito
  // Si ya existe el mismo producto con la misma talla, suma 1 a la cantidad
  // Si no existe, lo agrega con cantidad: 1
  // Se pasa como prop a Productos y DetalleProducto
  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existe = prev.find(
        (item) => item.id === producto.id && item.talla === producto.talla
      );
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id && item.talla === producto.talla
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }

  // eliminar productos del carrito
  // Filtra y saca el ítem que tenga el mismo id Y la misma talla
  // Se pasa como prop a Carrito a CarritoItem
  function eliminarDelCarrito(id, talla) {
    setCarrito((prev) =>
      prev.filter((item) => !(item.id === id && item.talla === talla))
    );
  }

  // aumentar cantidades
  // Busca el ítem por id y talla y le suma 1 a la cantidad
  // Se pasa como prop a Carrito a CarritoItem
  function aumentarCantidad(id, talla) {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id && item.talla === talla
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  }

  // Disminuir cantidades
  // Resta 1 a la cantidad; si llega a 0 el ítem se elimina con el .filter()
  // Se pasa como prop a Carrito a CarritoItem
  function disminuirCantidad(id, talla) {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id && item.talla === talla
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  // se llama desde Contacto al confirmar la compra
  // Resetea el carrito a array vacío después de la confirmación simulada
  function vaciarCarrito() {
    setCarrito([]);
  }

  // mostrar la cantidad total de productos
  // Suma las cantidades de todos los ítems del carrito
  // bloquear el botón si es 0
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    // la navegación 
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar recibe totalItems para mostrar el contador del carrito */}
        <Navbar totalItems={totalItems} />

        <main className="flex-grow">
          {/* rutas de Inicio, Productos, Detalle, Carrito, Contacto y todo eso */}
          <Routes>
            <Route path="/" element={<Inicio />} />

            {/* productos recibe agregarAlCarrito para pasarlo a cada ProductoCard */}
            <Route
              path="/productos"
              element={<Productos agregarAlCarrito={agregarAlCarrito} />}
            />

            {/* rutas dinámicas /producto/:id" */}
            <Route
              path="/productos/:id"
              element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />}
            />

            {/* pagina del carrito con todas las funciones */}
            <Route
              path="/carrito"
              element={
                <Carrito
                  carrito={carrito}
                  eliminarDelCarrito={eliminarDelCarrito}
                  aumentarCantidad={aumentarCantidad}
                  disminuirCantidad={disminuirCantidad}
                />
              }
            />

            {/* formulario de compra; recibe totalItems para validar carrito vacio */}
            <Route
              path="/contacto"
              element={
                <Contacto totalItems={totalItems} vaciarCarrito={vaciarCarrito} />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
