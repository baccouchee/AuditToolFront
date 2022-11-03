import React, { useEffect, useState } from 'react'
import DrawerPerm from '../Components/Drawer/DrawerPerm'
import {
  Button,
  Grid,
  Chip,
  Box,
  Breadcrumbs,
  Typography,
  Link,
  CardContent,
  Card,
  Divider,
  CardHeader,
  IconButton,
  CardActions,
  Avatar,
  Toolbar,
} from '@mui/material'
import { useQuery } from 'react-query'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useNavigate, useParams } from 'react-router-dom'
import { Buffer } from 'buffer'
import DialogWorkProgram from '../Components/Dialog/DialogWorkProgram'
import DataGridWP from '../Components/DataGrid/DataGridWp'

const Workprogram = () => {
  const { id } = useParams()
  const token = localStorage.getItem('thisismynewcourse')
  const navigate = useNavigate()
  const btnstyle = { backgroundColor: '#FFE600', color: '#1A1A24' }
  const btnstyle1 = { backgroundColor: '#1A1A24', color: 'white', margin: '1%' }

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

  const { data: workprogramdata } = useQuery('workprogramdata', () =>
    axios.get(`workprograms/${id}`, {
      onSuccess: async data => {
        console.log(data)
      },
      onError: async error => {
        console.log(error)
      },
    }),
  )

  return (
    <>
      {workprogramdata && (
        <DrawerPerm pagename="Work programs">
          <Toolbar />
          <Box
            sx={{
              padding: 1,
              margin: 1,
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/projects">
                Projects
              </Link>
              <Link underline="hover" color="inherit" href="/projects/workprogram/62bda1128d92744ec8923e1b">
                Work Program
              </Link>
            </Breadcrumbs>
            <DialogWorkProgram open={open} handleClose={handleClose} id={id} />
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                type="submit"
                style={btnstyle}
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Create a new workprogram
              </Button>
            </Box>
            <Box sx={{ marginTop: '2%' }}>
              <DataGridWP />
            </Box>
          </Box>
        </DrawerPerm>
      )}
    </>
  )
}

export default Workprogram
