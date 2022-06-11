import * as React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import { Avatar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { mainListItems, secondaryListItems } from '../Data/listItems'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))
const StyledBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    color: '#1A1A24',
    backgroundColor: '#FFE600',
  },
})

const mdTheme = createTheme()
const DrawerPerm = ({ children }) => {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const styles = {
    list: {
      marginTop: '30%',
    },
    bottom: {},
    paper: {
      background: 'blue',
    },
    avatar: {
      color: '#FFFFFF',
    },
    logo: {
      maxWidth: 50,
      marginRight: '60%',
    },
  }

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open} sx={{ background: '#1A1A24' }}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Dashboard
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton color="inherit">
                <StyledBadge badgeContent={4}>
                  <NotificationsIcon />
                </StyledBadge>
              </IconButton>
              <Box sx={{ flexGrow: 0.03 }} />
              <Avatar src="/avatar.jpg" variant="circular"></Avatar>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            open={open}
            PaperProps={{
              sx: {
                backgroundColor: '#333332',
                color: 'white',
              },
            }}
          >
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <img src="/white.png" style={styles.logo} />
              <IconButton onClick={toggleDrawer} sx={{ color: '#FFFFFF' }}>
                <ChevronLeftIcon color="white" />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">{mainListItems}</List>
            <Box sx={{ flexGrow: 1 }} />
            <Divider sx={{ my: 1, backgroundColor: '#737373' }} />

            <List component="nav">{secondaryListItems}</List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: theme =>
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />

            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default DrawerPerm
