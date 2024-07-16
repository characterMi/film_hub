import { Box, CircularProgress, useTheme } from "@mui/material";

const Loader = ({ size }) => {
  const theme = useTheme();

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" mt="5rem">
        <CircularProgress
          color={theme.palette.mode === "light" ? "primary" : "error"}
          size={size}
        />
      </Box>
    </>
  );
}

export default Loader;
