import {
  Brightness4,
  Brightness7,
  Menu,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useContext, useState } from "react";
import { Auth, Search, Sidebar } from ".";
import { ColorModeContext } from "../themes/ThemeProviderComponent";

const Navbar = ({ theme }) => {
  const colorToggleMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery("(max-width:599px)");
  const isTablet = useMediaQuery("(max-width:899px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            height: "80px",
            ml: { xs: 0, md: "240px" },
            display: "flex",
            justifyContent: "space-between",
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            sx={{
              display: { xs: "block", md: "none" },
              outline: "none",
              mr: "2rem",
            }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu />
          </IconButton>
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorToggleMode.toggleColorMode}
            aria-label="Toggle dark mode"
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search theme={theme} />}

          <Auth isMobile={isMobile} theme={theme} />

          {isMobile && <Search theme={theme} />}
        </Toolbar>
      </AppBar>
      <Box>
        <Box
          component="nav"
          sx={{ width: { xs: "0", md: "240px" }, flexShrink: "0" }}
        >
          {isTablet ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={isMenuOpen}
              onClose={() => setIsMenuOpen((prev) => !prev)}
              sx={{ "& .MuiDrawer-paper": { width: "240px" } }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar theme={theme} setIsMenuOpen={setIsMenuOpen} />
            </Drawer>
          ) : (
            <Drawer
              sx={{ "& .MuiDrawer-paper": { width: "240px" } }}
              variant="permanent"
              open
            >
              <Sidebar theme={theme} setIsMenuOpen={setIsMenuOpen} />
            </Drawer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
