import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function CustomThemeProvider({ children }) {
  const [modoEscuro, setModoEscuro] = useState(false);

  const toggleTheme = () => setModoEscuro((prev) => !prev);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: modoEscuro ? 'dark' : 'light',
      primary: {
        main: '#7B2CBF',
      },
      secondary: {
        main: '#4CC9F0',
      },
    },
  }), [modoEscuro]);

  return (
    <ThemeContext.Provider value={{ modoEscuro, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
