import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

const Error = ({ backButton, theme, text }) => (
  <Box
    display="flex"
    mt="20px"
    justifyContent="center"
    alignItems="center"
    sx={{ flexDirection: { xs: "column", md: "row" } }}
  >
    <Typography variant="h4" textAlign="center">
      {text}
    </Typography>
    {backButton ? (
      <Button
        color={theme.palette.mode === "light" ? "primary" : "error"}
        sx={{ ml: "20px", fontSize: "24px", mt: { xs: "1rem", md: "0" } }}
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    ) : null}
  </Box>
);

export default Error;
