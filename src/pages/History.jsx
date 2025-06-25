import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import api from '../services/api';
import OptionCard from '../components/OptionCard';

export default function History() {
  const [comparacoes, setComparacoes] = useState([]);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroVencedor, setFiltroVencedor] = useState('');
  const [ordenacao, setOrdenacao] = useState('desc');

  useEffect(() => {
    fetchComparacoes();
  }, []);

  const fetchComparacoes = async () => {
    try {
      const res = await api.get('/comparacoes?_sort=data&_order=desc');
      setComparacoes(res.data);
    } catch {
      setComparacoes([]);
    }
  };

  const comparacoesFiltradas = comparacoes
    .filter((c) =>
      c.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
    )
    .filter((c) =>
      filtroVencedor ? c.analise?.vencedor === filtroVencedor : true
    )
    .sort((a, b) => {
      if (ordenacao === 'asc') return new Date(a.data) - new Date(b.data);
      return new Date(b.data) - new Date(a.data);
    });

  const vencedoresUnicos = [
    ...new Set(comparacoes.map((c) => c.analise?.vencedor).filter(Boolean)),
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
        📚 Histórico de Comparações
      </Typography>

      <Paper sx={{ p: 2, mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          label="Filtrar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
          size="small"
        />

        <FormControl size="small">
          <InputLabel>Vencedor</InputLabel>
          <Select
            label="Vencedor"
            value={filtroVencedor}
            onChange={(e) => setFiltroVencedor(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">Todos</MenuItem>
            {vencedoresUnicos.map((venc, idx) => (
              <MenuItem key={idx} value={venc}>
                {venc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Ordenar por data</InputLabel>
          <Select
            label="Ordenar por data"
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="desc">Mais recentes primeiro</MenuItem>
            <MenuItem value="asc">Mais antigas primeiro</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {comparacoesFiltradas.length === 0 ? (
        <Typography variant="body1">Nenhuma comparação encontrada.</Typography>
      ) : (
        comparacoesFiltradas.map((comp, i) => (
          <Box key={comp.id || i} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.dark', mb: 1 }}>
              📝 {comp.titulo}
            </Typography>

            {comp.analise?.vencedor && (
              <Typography variant="subtitle1" color="success.main" sx={{ mb: 1 }}>
                Escolha do Chat: <strong>{comp.analise.vencedor}</strong>
              </Typography>
            )}

            {comp.opcoes.map((op, idx) => {
              const isVencedor = comp.analise?.vencedor === op.nome;
              const motivo = comp.analise?.motivos?.[op.nome] || 'Sem análise disponível.';
              return (
                <OptionCard
                  key={idx}
                  nome={op.nome}
                  destaque={isVencedor}
                  resumo={motivo}
                />
              );
            })}
          </Box>
        ))
      )}
    </Box>
  );
}
