import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext();

function getThemeFromStorage() {
  if (localStorage.getItem("mode") === "dark") return "dark";

  return "light";
}

const ThemeProviderComponent = ({ children }) => {
  const [mode, setMode] = useState(getThemeFromStorage);
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
            sml: 768,
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

  const toggleTheme = () => {
    const meta = document.querySelector("meta[name=color-scheme]");

    if (mode === "light") {
      localStorage.setItem("mode", "dark");
      meta.setAttribute("content", "dark");
      return setMode("dark");
    }

    localStorage.setItem("mode", "light");
    meta.setAttribute("content", "only light");
    setMode("light");
  };

  return (
    <ThemeContext.Provider value={{ theme: mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

export default ThemeProviderComponent;
