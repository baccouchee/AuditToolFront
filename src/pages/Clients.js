import {
  Button,
  Grid,
  Box,
  InputLabel,
  FormControl,
  Breadcrumbs,
  Typography,
  Link,
  IconButton,
  Toolbar,
} from '@mui/material'
import React, { useState, Component, useEffect } from 'react'
import DataGridDemo from '../Components/DataGrid/DataGrid'
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Select from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close'
import DrawerPerm from '../Components/Drawer/DrawerPerm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import DialogComp from '../Components/Dialog/DialogComp'
import StatClient from '../Components/Charts/statClient'

const Client = () => {
  const btnstyle = { backgroundColor: '#FFE600', color: '#1A1A24' }
  const token = localStorage.getItem('thisismynewcourse')
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { isLoading, data, error } = useQuery('userdata', () =>
    axios.get(
      'users/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {
        onSuccess: async data => {
          if (data.data.roles == 'junior') {
            console.log(junior)
          }
        },
        onError: async error => {
          console.log(error)
          navigate('/login')
        },
      },
    ),
  )

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  if (data && data.data.roles == 'junior') {
    navigate('/projects')
  }

  return (
    <div>
      {isLoading && <CircularProgress />}
      {data && data.data.roles == 'senior' && (
        <DrawerPerm pagename="Client Dashboard">
          <Toolbar />
          <Box
            sx={{
              padding: 1,
              margin: 1,
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/Clients">
                Clients
              </Link>
              <Link underline="hover" color="inherit" href="#"></Link>
            </Breadcrumbs>

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                type="submit"
                style={btnstyle}
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Add client
              </Button>
            </Box>
            <Box sx={{ marginTop: '2%' }}>
              <DialogComp open={open} handleClose={handleClose} />
              <DataGridDemo />
            </Box>
          </Box>
        </DrawerPerm>
      )}
    </div>
  )
}

export default Client
