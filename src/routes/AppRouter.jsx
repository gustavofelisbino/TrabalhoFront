import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Compare from '../pages/Compare';
import History from '../pages/History';
import Result from '../pages/Result';
import Shortcuts from '../pages/Shortcuts';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comparar" element={<Compare />} />
      <Route path="/historico" element={<History />} />
      <Route path="/resultado/:id" element={<Result />} />
      <Route path="/atalhos" element={<Shortcuts />} />
    </Routes>
  );
}
