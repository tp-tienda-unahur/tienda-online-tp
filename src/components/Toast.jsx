import { useEffect, useState } from 'react';

function Toast({ mensaje, visible, onClose }) {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (visible) {
      setMostrar(true);
      const timer = setTimeout(() => {
        setMostrar(false);
        setTimeout(onClose, 300);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible && !mostrar) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 bg-black dark:bg-white text-white dark:text-black px-6 py-4 font-bold uppercase tracking-wider text-sm z-50 border border-black dark:border-white shadow-lg transition-all duration-300 ${
        mostrar ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        {mensaje}
      </div>
    </div>
  );
}

export default Toast;