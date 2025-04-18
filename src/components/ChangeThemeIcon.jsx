import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTheme } from "../themes/ThemeProviderComponent";

const ChangeThemeIcon = ({ theme }) => {
    const { toggleTheme } = useTheme();

    return (
        <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
        >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    )
}

export default ChangeThemeIcon