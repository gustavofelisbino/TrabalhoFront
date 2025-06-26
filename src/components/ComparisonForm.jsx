import { useState } from 'react';
import api from '../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  CircularProgress
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

function gerarPrompt(comparacao) {
  let prompt = `Você é um assistente que ajuda a escolher a melhor opção com base nas opções informadas. Aqui estão as opções:\n\n`;

  comparacao.opcoes.forEach((op, i) => {
    prompt += `Opção ${i + 1}: ${op.nome}\n`;
  });

  prompt += `
Agora, responda SOMENTE um JSON com essa estrutura EXATA:
{
  "vencedor": "nome da opção que você acha melhor",
  "motivos": {
    "nome da opção 1": "explicação breve para essa opção, citando argumentos, e também um pequeno motivo para NÃO escolher se for o caso",
    "nome da opção 2": "explicação breve para essa opção, citando argumentos, e também um pequeno motivo para NÃO escolher se for o caso"
  }
}
Por favor, responda APENAS com o JSON sem texto adicional.
Sua resposta deve conter o nome exato das opções e explicações objetivas, com no máximo 3 frases para cada.
`;

  return prompt;
}

function extrairJsonDoTexto(texto) {
  try {
    const inicio = texto.indexOf('{');
    const fim = texto.lastIndexOf('}');
    if (inicio === -1 || fim === -1) return null;
    const jsonStr = texto.substring(inicio, fim + 1);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

export default function ComparisonForm({ onCreated, loading, setLoading }) {
  const [titulo, setTitulo] = useState('');
  const [opcoes, setOpcoes] = useState([
    { nome: '' },
    { nome: '' },
  ]);

  function handleNomeChange(index, valor) {
    const novasOpcoes = [...opcoes];
    novasOpcoes[index].nome = valor;
    setOpcoes(novasOpcoes);
  }

  function addOpcao() {
    setOpcoes([...opcoes, { nome: '' }]);
  }

  function removeOpcao(index) {
    const novasOpcoes = [...opcoes];
    novasOpcoes.splice(index, 1);
    setOpcoes(novasOpcoes);
  }

  function validar() {
    if (!titulo.trim()) return false;
    if (opcoes.length < 2) return false;
    for (const op of opcoes) {
      if (!op.nome.trim()) return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validar()) {
      alert('Preencha título e pelo menos duas opções válidas.');
      return;
    }

    setLoading(true);

    const novaComparacao = {
      titulo,
      data: new Date().toISOString(),
      opcoes,
    };

    const prompt = gerarPrompt(novaComparacao);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Você é um assistente especialista em análise comparativa.',
            },
            { role: 'user', content: prompt },
          ],
          max_tokens: 400,
          temperature: 0.3,
        }),
      });

      if (!res.ok) throw new Error('Erro ao criar comparação');

      const data = await res.json();

      console.log('Resposta bruta ChatGPT:', data.choices[0].message.content);

      let respostaChat = extrairJsonDoTexto(data.choices[0].message.content);

      if (!respostaChat) {
        alert('Erro ao interpretar resposta do ChatGPT. A resposta não continha JSON válido.');
        respostaChat = { vencedor: 'Indefinido', motivos: {} };
      }

      const comparacaoCompleta = {
        ...novaComparacao,
        analise: respostaChat,
      };

      const saveRes = await api.post('/comparacoes', comparacaoCompleta);

      const savedData = saveRes.data;

      onCreated(savedData);

      setTitulo('');
      setOpcoes([{ nome: '' }, { nome: '' }]);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" mb={2}>
        Nova Comparação
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Título da comparação"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          fullWidth
          required
          sx={{ mb: 3 }}
        />

        {opcoes.map((op, idx) => (
          <Box
            key={idx}
            display="flex"
            alignItems="center"
            gap={1}
            mb={2}
            sx={{ flexWrap: 'wrap' }}
          >
            <TextField
              label={`Nome da opção ${idx + 1}`}
              value={op.nome}
              onChange={(e) => handleNomeChange(idx, e.target.value)}
              required
              sx={{ flexGrow: 1, minWidth: 180 }}
            />

            {opcoes.length > 2 && (
              <IconButton
                color="error"
                aria-label="Remover opção"
                onClick={() => removeOpcao(idx)}
                sx={{ ml: 1 }}
              >
                <RemoveCircle />
              </IconButton>
            )}
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddCircle />}
          onClick={addOpcao}
          sx={{ mb: 3 }}
        >
          Adicionar Opção
        </Button>

        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Salvar Comparação'}
        </Button>
      </Box>
    </Paper>
  );
}
