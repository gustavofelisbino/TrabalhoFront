import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid
} from '@mui/material';
import { useState } from 'react';

export default function EditModal({ comparacao, onClose, onSave }) {
  const [titulo, setTitulo] = useState(comparacao.titulo);
  const [op1, setOp1] = useState(comparacao.opcoes[0].nome);
  const [op2, setOp2] = useState(comparacao.opcoes[1].nome);

  const handleSalvar = () => {
    const editado = {
      ...comparacao,
      titulo,
      opcoes: [
        { ...comparacao.opcoes[0], nome: op1 },
        { ...comparacao.opcoes[1], nome: op2 }
      ]
    };
    onSave(comparacao.id, editado);
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>✏️ Editar Comparação</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Opção 1" value={op1} onChange={e => setOp1(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Opção 2" value={op2} onChange={e => setOp2(e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSalvar} variant="contained" sx={{ background: '#7B2CBF', color: '#fff' }}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
