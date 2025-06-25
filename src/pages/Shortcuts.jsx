import { Typography, Box, List, ListItem, ListItemText, Paper } from '@mui/material';

const atalhos = [
  { tecla: 'Alt + N', descricao: 'Abrir o formulário para criar nova comparação' },
  { tecla: 'Alt + H', descricao: 'Abrir o histórico' },
  { tecla: 'Alt + L', descricao: 'Abrir a página de home' },
];

export default function Shortcuts() {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 2 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main', userSelect: 'none' }}
      >
        Atalhos de Teclado
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: 'background.paper',
        }}
        className="glass"
      >
        <List>
          {atalhos.map(({ tecla, descricao }, i) => (
            <ListItem key={i} divider>
              <ListItemText
                primary={<code>{tecla}</code>}
                secondary={descricao}
                primaryTypographyProps={{ fontWeight: 'bold', color: 'primary.main' }}
                secondaryTypographyProps={{ color: 'text.primary' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
