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
import { Avatar, Button, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { mainListItems, secondaryListItems } from '../Data/listItems'
import { Chip, Stack, Snackbar } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { QueryClient, useMutation, useQueryClient } from 'react-query'
import { Logout, Settings } from '@mui/icons-material'

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
    marginRight: '40%',
  },
}

const mdTheme = createTheme()

const DrawerPerm = ({ children, pagename }) => {
  const [open, setOpen] = React.useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const navigate = useNavigate()

  const token = localStorage.getItem('thisismynewcourse')
  React.useEffect(() => {
    if (!token) {
      navigate('/login')
    } else {
      console.log(`Bearer ${token}`)
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const queryClient = useQueryClient()
  const data = queryClient.getQueryData('userdata')
  const [name, setName] = React.useState('')

  React.useEffect(() => {
    if (data) {
      setName(data.data.name)
    }
  }, [data])

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open1 = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open} sx={{ background: '#1A1A24' }}>
            <Toolbar
              sx={{
                pr: '24px',
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
                {pagename}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton color="inherit">
                <StyledBadge badgeContent={4}>
                  <NotificationsIcon />
                </StyledBadge>
              </IconButton>
              <Box sx={{ flexGrow: 0.03 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                  <Avatar alt="Natacha" src="/avatar.jpg" variant="circular" />
                </IconButton>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open1}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <Avatar alt="Natacha" src="/avatar.jpg" variant="circular" /> {name}
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <img src="/white.png" style={styles.logo} />
                <Typography>Audit Tool</Typography>
              </Box>
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
