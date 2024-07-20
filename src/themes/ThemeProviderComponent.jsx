import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

export const ColorModeContext = createContext();

const ThemeProviderComponent = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiTabs: {
            styleOverrides: {
              root: {
                color: mode === "light" ? "#2196f3" : "#f44336",
              },
              indicator: {
                background: mode === "light" ? "#2196f3" : "#f44336",
              },
            }
          }
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            mdl: 1000,
            lg: 1200,
            lgl: 1300,
            xl: 1536,
          }
        },
        palette: {
          mode,
        },
      }),
    [mode]
  );
  const toggleColorMode = () => {
    const meta = document.querySelector("meta[name=color-scheme]");

    if (mode === "light") {
      localStorage.setItem("mode", "dark");

      meta.setAttribute("content", "dark");

      return setMode("dark");
    }

    localStorage.setItem("mode", "light");
    meta.setAttribute("content", "light");
    setMode("light");
  };

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderComponent;
