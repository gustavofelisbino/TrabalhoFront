import { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

import { useSnackbar } from 'notistack';

export default function LoginCadastro() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function tratarErroFirebase(code) {
    switch (code) {
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/user-not-found':
        return 'Usuário não encontrado.';
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      case 'auth/email-already-in-use':
        return 'Email já está em uso.';
      case 'auth/weak-password':
        return 'Senha muito fraca (mínimo 6 caracteres).';
      default:
        return 'Erro inesperado. Tente novamente.';
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, senha);
        enqueueSnackbar('Login realizado com sucesso!', { variant: 'success' });
      } else {
        await createUserWithEmailAndPassword(auth, email, senha);
        enqueueSnackbar('Cadastro realizado com sucesso!', { variant: 'success' });
      }
      navigate('/');
    } catch (error) {
      const msg = tratarErroFirebase(error.code);
      enqueueSnackbar(msg, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 6, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" mb={3} textAlign="center">
        {isLogin ? 'Login' : 'Cadastro'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
          autoComplete="username"
        />

        <TextField
          label="Senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          fullWidth
          required
          sx={{ mb: 3 }}
          autoComplete={isLogin ? "current-password" : "new-password"}
        />

        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
        </Button>
      </form>

      <Typography variant="body2" mt={2} textAlign="center">
        {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
        <Link
          component="button"
          variant="body2"
          onClick={() => setIsLogin(!isLogin)}
          sx={{ cursor: 'pointer' }}
        >
          {isLogin ? 'Cadastre-se' : 'Faça login'}
        </Link>
      </Typography>
    </Box>
  );
}
