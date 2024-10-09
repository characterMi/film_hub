import { FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";

const ChangeType = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const type = localStorage.getItem("type");

    function onChange(event) {
        localStorage.setItem("type", event.target.value);
        window.location.reload();
    }

    return (
        <FormControl error={isDarkMode} sx={{ width: "90%", m: "10% auto" }}>
            <InputLabel id="change-type">Type</InputLabel>
            <Select
                labelId="change-type"
                value={type || "Movie"}
                label="Type"
                onChange={onChange}
            >
                <MenuItem value="movie">Movies</MenuItem>
                <MenuItem value="tv">TV-Shows</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ChangeType