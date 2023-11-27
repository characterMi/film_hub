import { AppBar, IconButton, Button, Toolbar, Drawer, Avatar, useMediaQuery, Box } from "@mui/material"
import { Menu, Brightness4, Brightness7, AccountCircle } from "@mui/icons-material"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Sidebar, Search } from ".";
import { createSessionId, fetchToken, moviesApi } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../features/auth";
import { ColorModeContext } from "../themes/ThemeProviderComponent";

const Navbar = ({ theme }) => {
  const colorToggleMode = useContext(ColorModeContext)
  const { isAuthenticated, user } = useSelector(userSelector)
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width:599px)');
  const isTablet = useMediaQuery('(max-width:899px)');
  // Open and Close Sidebar on Mobile Devices
  const [mobileOpen, setMobileOpen] = useState(false)
  const token = localStorage.getItem('request_token')
  const session_IdFromLocalStorage = localStorage.getItem('session_id')

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        try {
          // Check if the user Logged in or not
          if (session_IdFromLocalStorage) {
            const { data: userData } = await moviesApi.get(`/account?session_id=${session_IdFromLocalStorage}`)
            dispatch(setUser(userData))
          } else {
            const session_Id = await createSessionId()
            const { data: userData } = await moviesApi.get(`/account?session_id=${session_Id}`)
            dispatch(setUser(userData))
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    loginUser()
  }, [token])


  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ height: '80px', ml: { xs: 0, md: '240px' }, display: 'flex', justifyContent: 'space-between', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { xs: 'block', md: 'none' }, outline: 'none', mr: '2rem' }}
            onClick={() => setMobileOpen(prev => !prev)}
          >
            <Menu />
          </IconButton>
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorToggleMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search theme={theme} />}
          <Box>
            {!isAuthenticated ? (
              <Button color={theme.palette.mode === 'light' ? 'inherit' : 'error'} onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button color={theme.palette.mode === 'light' ? 'inherit' : 'error'} to={`/profile`} component={Link} sx={{ '&:hover': { color: '#fff !important', textDecoration: 'none' } }}>
                {!isMobile && <>{user?.name ? user?.name : user?.username} &nbsp;</>}
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  alt={user?.username}
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face/${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </Box>
          {isMobile && <Search theme={theme} />}
        </Toolbar>
      </AppBar>
      <Box>
        <Box component="nav" sx={{ width: { xs: '0', md: '240px' }, flexShrink: '0' }}>
          {isTablet ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(prev => !prev)}
              sx={{ "& .MuiDrawer-paper": { width: '240px' } }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar theme={theme} setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer sx={{ "& .MuiDrawer-paper": { width: '240px' } }} variant="permanent" open>
              <Sidebar theme={theme} setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Navbar