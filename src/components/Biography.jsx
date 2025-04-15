import { Box, Typography } from "@mui/material";

const Biography = ({ text, theme, smallDevice }) => {
  if (!text) return null;

  return (
    <>
      <Box
        sx={{
          display: smallDevice
            ? { xs: "block", lg: "none" }
            : { xs: "none", lg: "block" },
          mt: { xs: "3rem", lg: "1.5rem" },
        }}
      >
        <Typography variant="h4" align="center">
          Biography
        </Typography>
        <Box
          sx={{
            mt: "2rem",
            position: "relative",
            px: 1,
            py: 2,
            borderRadius: "10px",
            border: "1px solid",
            borderBottom: "10px solid",
            borderColor:
              theme.palette.mode === "light" ? "primary.main" : "error.main",
            backgroundColor:
              theme.palette.mode === "light" ? "#bbdefb62" : "#e538350c",
          }}
        >
          <Typography variant="body1" paragraph align="justify">
            {text}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Biography;
