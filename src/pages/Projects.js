import { Button, Box, Breadcrumbs, Typography, Link, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DrawerPerm from '../Components/Drawer/DrawerPerm'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import DialogProject from '../Components/Dialog/DialogProject'
import LastUpdatedWP from '../Components/Card/LastUpdatedWP'
import ProjectCard from '../Components/Card/ProjectCard'
import ProjectCardInProgress from '../Components/Card/ProjectCardInProgress'
import DeadLineProject from '../Components/Card/DeadLineProject'

const Projects = () => {
  const btnstyle = { backgroundColor: '#FFE600', color: '#1A1A24' }

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const navigate = useNavigate()

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

  const token = localStorage.getItem('thisismynewcourse')
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <DrawerPerm pagename="Projects List">
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
          <Link underline="hover" color="inherit" href="#"></Link>
        </Breadcrumbs>
        <DialogProject open={open} handleClose={handleClose} />
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" type="submit" style={btnstyle} startIcon={<AddIcon />} onClick={handleClickOpen}>
            Create project
          </Button>
        </Box>
        <Box
          sx={{
            padding: 1,
            margin: 1,
          }}
        >
          <Typography variant="p" level="p" fontWeight="bold">
            Dead line WorkProgram
          </Typography>
          <DeadLineProject />
        </Box>
        <Box
          sx={{
            padding: 1,
            margin: 1,
          }}
        >
          <Typography variant="p" level="p" fontWeight="bold">
            Your last updated work program
          </Typography>
          <LastUpdatedWP />
        </Box>

        <Box
          sx={{
            padding: 1,
            margin: 1,
          }}
        >
          <Typography variant="h6" level="h1" fontWeight="bold">
            Projects in progress
          </Typography>

          <ProjectCardInProgress />
        </Box>
        <Box
          sx={{
            padding: 1,
            margin: 1,
          }}
        >
          <Typography variant="h6" level="h1" fontWeight="bold">
            Projects not started
          </Typography>
          <ProjectCard />
        </Box>
      </Box>
    </DrawerPerm>
  )
}

export default Projects
