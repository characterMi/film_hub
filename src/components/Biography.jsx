import { Box, Typography } from "@mui/material";

const Biography = ({ text, theme, withinGrid }) => {
  if (!text) return null;

  const display =
    withinGrid ?
      { xs: "none", sml: "block", md: "none", mdl: "block" } :
      { xs: "block", sml: "none", md: "block", mdl: "none" };

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{
          my: "1.5rem",
          display,
        }}
      >
        Biography
      </Typography>
      <Box
        sx={{
          height: "100%",
          maxHeight: "max-content",
          overflow: "auto",
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
          display,
        }}
      >
        <Box>
          <Typography variant="body1" paragraph align="justify">
            {text}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Biography;
