import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useEffect, useMemo, useState } from 'react';


export const ColorModeContext = createContext()

const ThemeProviderComponent = ({ children }) => {
  const [mode, setMode] = useState('light')
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    }
  }), [mode])
  const toggleColorMode = () => {
    if (mode === 'light') {
      localStorage.removeItem('mode');
      localStorage.setItem('mode', 'dark');
      setMode(localStorage.getItem('mode'))
    } else if (mode === 'dark') {
      localStorage.removeItem('mode');
      localStorage.setItem('mode', 'light');
      setMode(localStorage.getItem('mode'))
    }
  }
  useEffect(() => {
    if (!!localStorage.getItem('mode')) {
      setMode(localStorage.getItem('mode'))
    }
  }, [])
  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ThemeProviderComponent