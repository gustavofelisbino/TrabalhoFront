import { useState, useEffect } from 'react';
import api from '../services/api';
import OptionCard from '../components/OptionCard';
import ComparisonForm from '../components/ComparisonForm';
import { Typography, Box } from '@mui/material';

export default function Compare() {
  const [comparacoes, setComparacoes] = useState([]);
  const [selecionada, setSelecionada] = useState(null);
  const [loadingResumo, setLoadingResumo] = useState(false);

  const fetchComparacoes = async () => {
    try {
      const res = await api.get('/comparacoes?_sort=data&_order=desc');
      setComparacoes(res.data);
    } catch {
      setComparacoes([]);
    }
  };

  useEffect(() => {
    fetchComparacoes();
  }, []);

  const handleNova = (nova) => {
    setComparacoes([nova, ...comparacoes]);
    setSelecionada(nova);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main', userSelect: 'none' }}
      >
        Comparações
      </Typography>

      <ComparisonForm
        onCreated={handleNova}
        loading={loadingResumo}
        setLoading={setLoadingResumo}
      />

      {comparacoes.map((comp, index) => (
        <Box
          key={comp.id || comp.data || index}
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 2,
            cursor: 'pointer',
            backgroundColor: selecionada?.id === comp.id ? 'primary.light' : 'transparent',
            border: selecionada?.id === comp.id ? '2px solid' : '1px solid',
            borderColor: selecionada?.id === comp.id ? 'primary.main' : 'divider',
            '&:hover': { backgroundColor: 'primary.lighter' },
          }}
          onClick={() => setSelecionada(comp)}
          tabIndex={0}
        >
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
            {comp.titulo}
          </Typography>
        </Box>
      ))}

      {selecionada && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.dark' }}>
            Detalhes da Comparação: <strong>{selecionada.titulo}</strong>
          </Typography>

          {selecionada.analise?.vencedor && (
            <Typography variant="subtitle1" color="success.main" sx={{ mb: 1 }}>
              Escolha do Chat: <strong>{selecionada.analise.vencedor}</strong>
            </Typography>
          )}

          {selecionada.opcoes.map((op, idx) => {
            const isVencedor =
              selecionada.analise?.vencedor?.toLowerCase() === op.nome.toLowerCase();
            const motivo =
              selecionada.analise?.motivos?.[op.nome] || 'Nenhuma análise disponível.';
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
      )}
    </Box>
  );
}
