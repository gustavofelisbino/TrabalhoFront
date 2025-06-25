import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../contexts/ThemeProvider';

export default function ThemeToggle() {
  const { modoEscuro, toggleTheme } = useThemeContext();

  return (
    <Tooltip title="Alternar tema">
      <IconButton onClick={toggleTheme} color="inherit">
        {modoEscuro ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}
