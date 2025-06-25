import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(event) {
      // Alt + N
      if (event.altKey && event.key.toLowerCase() === 'n') {
        event.preventDefault();
        navigate('/comparar');
      }

      // Outros atalhos, exemplo:
      // Alt + H -> Histórico
      if (event.altKey && event.key.toLowerCase() === 'h') {
        event.preventDefault();
        navigate('/historico');
      }

      // Alt + L -> Login
      if (event.altKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        navigate('/login');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null; // Componente não renderiza nada visualmente
}
