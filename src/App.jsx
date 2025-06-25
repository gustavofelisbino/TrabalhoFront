import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';

import Navbar from './components/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/firebase';
import { SnackbarProvider } from 'notistack';

const LoginCadastro = lazy(() => import('./pages/LoginCadastro'));
const Home = lazy(() => import('./pages/Home'));
const Compare = lazy(() => import('./pages/Compare'));
const History = lazy(() => import('./pages/History'));
const Shortcuts = lazy(() => import('./pages/Shortcuts'));

function KeyboardShortcuts() {
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
      if (event.altKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        navigate('/atalhos');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Carregando...</div>;

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
    >
      <BrowserRouter>
        {user && <Navbar />}

        {/* Atalhos globais */}
        <KeyboardShortcuts />

        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            {/* rota pública */}
            <Route path="/login" element={!user ? <LoginCadastro /> : <Navigate to="/" />} />

            {/* rotas protegidas */}
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/comparar" element={user ? <Compare /> : <Navigate to="/login" />} />
            <Route path="/historico" element={user ? <History /> : <Navigate to="/login" />} />
            <Route path="/atalhos" element={user ? <Shortcuts /> : <Navigate to="/login" />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
