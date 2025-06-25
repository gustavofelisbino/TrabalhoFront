import { Typography, Box, Paper } from '@mui/material';

export default function ResultDisplay({ resultado }) {
  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h6">Resultado Final</Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant="h4" color="primary">
          🏆 Melhor Opção: {resultado}
        </Typography>
      </Box>
    </Paper>
  );
}
