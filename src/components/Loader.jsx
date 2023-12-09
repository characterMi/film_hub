import { Box, CircularProgress } from "@mui/material";

const Loader = ({ theme, size }) => (
  <>
    <Box display="flex" justifyContent="center" alignItems="center" mt="5rem">
      <CircularProgress
        color={theme.palette.mode === "light" ? "primary" : "error"}
        size={size}
      />
    </Box>
  </>
);
export default Loader;
