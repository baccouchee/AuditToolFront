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
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DrawerPerm from '../Components/Drawer/DrawerPerm'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Buffer } from 'buffer'

const Projects = () => {
  const btnstyle = { backgroundColor: '#FFE600', color: '#1A1A24' }
  const btnstyle1 = { backgroundColor: '#1A1A24', color: 'white', margin: '1%' }

  const handleClickOpen = () => {
    setOpen(true)
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

  const {
    isLoading: isLoadingProject,
    data: dataProject,
    error: errorProject,
  } = useQuery('projectsdata', () =>
    axios.get('projects/all', {
      onSuccess: async dataProject => {
        console.log(dataProject)
      },
      onError: async errorProject => {
        console.log(errorProject)
      },
    }),
  )

  const Navigate = status => {
    if (status === 'Created') {
      navigate('/activate')
    }
    if (status === 'In progress') {
      navigate('/workprogram')
    }
    if (status === 'Closed') {
      navigate('/workprogram')
    }
  }

  return (
    <DrawerPerm pagename="Projects List">
      {dataProject && (
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

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              type="submit"
              style={btnstyle}
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Ajouter un projet
            </Button>
          </Box>

          <Box
            sx={{
              padding: 2,
              margin: 2,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <Grid container>
              {dataProject.data.map(({ client, status }) => {
                return (
                  <Grid
                    item
                    component={Card}
                    xs={3}
                    sx={{
                      marginRight: '2%',
                      marginTop: '2%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: '2px',
                    }}
                    key={client._id}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          variant="rounded"
                          sx={{ width: 56, height: 56 }}
                          src={`data:${client};base64, ${Buffer.from(client.avatar.data).toString('base64')}`}
                        />
                      }
                      title={client.name}
                      subheader={
                        status === 'In progress' ? (
                          <Chip
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: '3%', textTransform: 'uppercase', fontSize: '80%' }}
                            label={status}
                            color="warning"
                          />
                        ) : status === 'Created' ? (
                          <Chip
                            label={status}
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: '3%', textTransform: 'uppercase', fontSize: '80%' }}
                            color="success"
                          />
                        ) : (
                          <Chip
                            label={status}
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: '3%', textTransform: 'uppercase', fontSize: '80%' }}
                            color="error"
                          />
                        )
                      }
                      action={
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      }
                    />
                    <CardContent>
                      <Box style={{ width: 250, whiteSpace: 'nowrap' }}>
                        <Typography
                          component="p"
                          color="text.secondary"
                          sx={{
                            width: '100%',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            fontSize: '0.875rem',
                            fontWeight: '700',
                          }}
                        >
                          {client.description}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box sx={{ flexGrow: 1 }} />
                    <Divider />

                    <CardActions>
                      <Box sx={{ flexGrow: 1 }} />
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => Navigate(status)}
                        type="submit"
                        style={btnstyle1}
                      >
                        Show
                      </Button>
                    </CardActions>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Box>
      )}
    </DrawerPerm>
  )
}

export default Projects
