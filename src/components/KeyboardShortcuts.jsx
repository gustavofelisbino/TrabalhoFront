import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.altKey && event.key.toLowerCase() === 'n') {
        event.preventDefault();
        navigate('/comparar');
      }

      if (event.altKey && event.key.toLowerCase() === 'h') {
        event.preventDefault();
        navigate('/historico');
      }

      if (event.altKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        navigate('/login');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}
