import { Box } from '@mui/material';

export default function TypingDots() {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            animation: 'blink 1.4s infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </Box>
  );
}
