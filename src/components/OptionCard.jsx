import { Paper, Typography, Chip, Box } from '@mui/material';

export default function OptionCard({ nome, destaque, resumo }) {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        mt: 2,
        border: destaque ? '2px solid #4caf50' : '1px solid #ccc',
        backgroundColor: destaque ? '#e8f5e9' : 'background.paper',
        borderRadius: 3,
        transition: '0.3s ease',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6">{nome}</Typography>
        {destaque && <Chip label="Escolha do ChatGPT 🤖" color="success" />}
      </Box>

      {resumo && (
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          {resumo}
        </Typography>
      )}
    </Paper>
  );
}
