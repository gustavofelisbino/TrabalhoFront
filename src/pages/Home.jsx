import { Typography, Button, Box, Paper, Grid, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import InsightsIcon from '@mui/icons-material/Insights';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { motion } from 'framer-motion';

const cardData = [
  {
    title: 'Clareza nas Ideias',
    icon: <EmojiObjectsIcon sx={{ fontSize: 40, mb: 1 }} />,
    text: 'Estruture suas opções de forma visual e organizada.',
  },
  {
    title: 'Apoio Inteligente',
    icon: <InsightsIcon sx={{ fontSize: 40, mb: 1 }} />,
    text: 'Utilize IA para entender qual opção pode ser mais vantajosa.',
  },
  {
    title: 'Histórico de Comparações',
    icon: <ChecklistIcon sx={{ fontSize: 40, mb: 1 }} />,
    text: 'Acompanhe suas decisões passadas e evolua com elas.',
  },
];

export default function Home() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        className="glass"
        elevation={3}
        sx={{
          p: 6,
          borderRadius: 4,
          textAlign: 'center',
          backgroundColor: isDark ? 'background.paper' : '#f8f9ff',
          mb: 6,
          maxWidth: 700,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, color: '#7B2CBF' }}>
          Bem-vindo ao Decisão+
        </Typography>

        <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
          Compare opções, visualize prós e contras com inteligência, e tome decisões com mais segurança.
        </Typography>

        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/comparar"
          aria-label="Iniciar nova comparação"
          sx={{
            px: 4,
            py: 0.8,
            fontSize: '1.1rem',
            background: 'linear-gradient(to right, #7B2CBF, #4CC9F0)',
            fontWeight: 'bold',
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          Começar Comparação
        </Button>
      </Paper>

      <Grid container spacing={3} justifyContent="center" maxWidth={1000}>
        {cardData.map((card, i) => (
          <Grid item xs={12} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  height: '100%',
                  backgroundColor: isDark ? 'background.default' : '#EDE9F4',
                  color: isDark ? 'text.primary' : 'text.secondary',
                }}
              >
                {card.icon}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body1">{card.text}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
