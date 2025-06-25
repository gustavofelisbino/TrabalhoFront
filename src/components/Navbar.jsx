import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth).then(() => {
      navigate('/login');
    });
  }

  return (
    <AppBar position="sticky" sx={{
      background: 'linear-gradient(90deg, #7B2CBF 0%, #4CC9F0 100%)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <Toolbar className="container">
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          ⚖️ Decisão+
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button color="inherit" component={Link} to="/">Início</Button>
          <Button color="inherit" component={Link} to="/comparar">Comparar</Button>
          <Button color="inherit" component={Link} to="/historico">Histórico</Button>
          <Button color="inherit" component={Link} to="/atalhos">Atalhos</Button>
          <Button color="inherit" onClick={handleLogout}>Sair</Button>
          <ThemeToggle />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
