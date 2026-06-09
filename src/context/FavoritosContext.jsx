import { createContext, useContext, useState, useEffect } from 'react';

const FavoritosContext = createContext();

// Contexto para manejar los productos favoritos
// Usa localStorage para persistir los favoritos entre sesiones
export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const guardado = localStorage.getItem('favoritos');
    return guardado ? JSON.parse(guardado) : [];
  });

  // Guardar favoritos en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  // Verificar si un producto está en favoritos
  function esFavorito(id) {
    return favoritos.some((item) => item.id === id);
  }

  // Agregar o quitar un producto de favoritos
  // Si ya existe, lo elimina; si no existe, lo agrega
  function toggleFavorito(producto) {
    setFavoritos((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.filter((item) => item.id !== producto.id);
      }
      return [...prev, producto];
    });
  }

  // Eliminar un producto de favoritos por su id
  function eliminarFavorito(id) {
    setFavoritos((prev) => prev.filter((item) => item.id !== id));
  }

  // Vaciar todos los favoritos
  function vaciarFavoritos() {
    setFavoritos([]);
  }

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        esFavorito,
        toggleFavorito,
        eliminarFavorito,
        vaciarFavoritos,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

// Hook personalizado para usar el contexto de favoritos
export function useFavoritos() {
  return useContext(FavoritosContext);
}