import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import BallotIcon from '@mui/icons-material/Ballot'
import HomeIcon from '@mui/icons-material/Home'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/home">
      <ListItemIcon sx={{ color: '#FFFFFF' }}>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={Link} to="/clients">
      <ListItemIcon sx={{ color: '#FFFFFF' }}>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Clients" />
    </ListItemButton>

    <ListItemButton component={Link} to="/projects">
      <ListItemIcon sx={{ color: '#FFFFFF' }}>
        <BusinessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Projects" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon sx={{ color: '#FFFFFF' }}>
        <BallotIcon />
      </ListItemIcon>
      <ListItemText primary="Work programs" />
    </ListItemButton>
  </React.Fragment>
)

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon sx={{ color: '#FFFFFF' }}>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Setting" />
    </ListItemButton>

    <ListItemButton component={Link} to="/login">
      <ListItemIcon sx={{ color: '#FFFFFF' }}>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
  </React.Fragment>
)
