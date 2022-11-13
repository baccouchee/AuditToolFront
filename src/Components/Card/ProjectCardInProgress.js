import {
  Button,
  Grid,
  Chip,
  Box,
  Typography,
  CardContent,
  Card,
  Divider,
  CardHeader,
  CardActions,
  Avatar,
} from '@mui/material'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Buffer } from 'buffer'
import { useNavigate } from 'react-router-dom'
import IsolatedMenu from '../Menu/IsolatedMenu'
import DetailsProject from '../Dialog/DetailsProject'

const ProjectCardInProgress = () => {
  const btnstyle1 = { borderColor: '#1A1A24', color: 'black', margin: '1%' }
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = f => {
    setOpen(false)
  }

  const { data } = useQuery('projectsdata', () =>
    axios.get('projects/all', {
      onSuccess: async dataProject => {
        console.log(dataProject)
      },
      onError: async errorProject => {
        console.log(errorProject)
      },
    }),
  )

  const Navigate = (status, _id) => {
    if (status === 'Created') {
      navigate(`activate/${_id}`)
    }
    if (status === 'In progress') {
      navigate(`workprogram/${_id}`)
    }
    if (status === 'Closed') {
      navigate(`workprogram/${_id}`)
    }
  }

  var cardStyle = {
    transitionDuration: '0.3s',
  }

  const HandleShowMore = index => {
    setIndexBtnClicked(index)
    if (i === 1) {
      setWebkitLineClampstate('auto')
      seti(2)
    }
    if (i === 2) {
      setWebkitLineClampstate('3')
      seti(1)
    }
  }

  return (
    <>
      {data && (
        <Grid container style={{ width: '100%' }}>
          {data.data.map((i, index, onClick) => {
            if (i.status !== 'Created')
              return (
                <Grid
                  item
                  component={Card}
                  md={3}
                  style={cardStyle}
                  sx={{
                    marginRight: '2%',
                    marginTop: '2%',
                    Width: '20%',
                    borderRadius: '2px',
                  }}
                  key={index}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                        src={`data:${i.client};base64, ${Buffer.from(i.client.avatar.data).toString('base64')}`}
                      />
                    }
                    title={i.client.name}
                    subheader={
                      i.status === 'In progress' ? (
                        <Chip
                          variant="outlined"
                          size="small"
                          sx={{ marginTop: '3%', textTransform: 'uppercase', fontSize: '80%' }}
                          label={i.status}
                          color="warning"
                        />
                      ) : i.status === 'Created' ? (
                        <Chip
                          label={i.status}
                          variant="outlined"
                          size="small"
                          sx={{ marginTop: '3%', textTransform: 'uppercase', fontSize: '80%' }}
                          color="success"
                        />
                      ) : (
                        <Chip
                          label={i.status}
                          variant="outlined"
                          size="small"
                          sx={{ marginTop: '3%', textTransform: 'uppercase', fontSize: '80%' }}
                          color="error"
                        />
                      )
                    }
                    action={<IsolatedMenu id={i._id} />}
                  />
                  <CardContent>
                    <Typography
                      component="p"
                      color="text.secondary"
                      value={i._id}
                      key={index}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '3',
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {i.description}
                    </Typography>
                  </CardContent>
                  <DetailsProject open={open} handleClose={handleClose} i={i} />
                  <Divider />

                  <CardActions>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button onClick={handleClickOpen} size="small" sx={{ color: 'black', backgroundColor: '#FFE600' }}>
                      Details
                    </Button>
                    <Button
                      size="small"
                      onClick={() => Navigate(i.status, i._id)}
                      sx={{
                        ':hover': {
                          cursor: 'pointer',
                          background: '#60607d',
                          color: 'red',
                          transition: '0.3s',
                        },
                      }}
                      type="submit"
                      variant="outlined"
                      style={btnstyle1}
                    >
                      access
                    </Button>
                  </CardActions>
                </Grid>
              )
          })}
        </Grid>
      )}
    </>
  )
}

export default ProjectCardInProgress
