import { Grid, Chip, Box, Card, CardHeader, Avatar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Buffer } from 'buffer'
import { useNavigate } from 'react-router-dom'
import IsolatedMenuPCreated from '../Menu/IsolatedMenuPCreated'
import moment from 'moment'
const ProjectCard = () => {
  const navigate = useNavigate()

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

  var cardStyle = {
    transitionDuration: '0.3s',
  }

  return (
    <>
      {data && (
        <Grid container style={{ width: '100%' }}>
          {data.data.map(({ client, status, _id }, index, onClick) => {
            if (status === 'Created') {
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
                        sx={{ width: 40, height: 40 }}
                        src={`data:${client};base64, ${Buffer.from(client.avatar.data).toString('base64')}`}
                      />
                    }
                    title={<Box sx={{ textTransform: 'uppercase', fontWeight: 520 }}> {client.name} </Box>}
                    subheader={
                      status === 'In progress' ? (
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Chip
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: '3%', marginRight: '3%', textTransform: 'uppercase', fontSize: '80%' }}
                            label={status}
                            color="warning"
                          />
                          <Typography sx={{ marginTop: '10%', fontSize: '80%' }}>
                            - {moment(client.date).format('DD/MM/YYYY')}
                          </Typography>
                        </Box>
                      ) : status === 'Created' ? (
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Chip
                            label={status}
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: '3%', marginRight: '3%', textTransform: 'uppercase', fontSize: '80%' }}
                            color="success"
                          />
                          <Typography sx={{ marginTop: '5%', fontSize: '80%' }}>
                            {' '}
                            - {moment(client.date).format('DD/MM/YYYY')}
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Chip
                            label={status}
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: '3%', marginRight: '3%', textTransform: 'uppercase', fontSize: '80%' }}
                            color="error"
                          />
                          <Typography sx={{ marginTop: '10%', fontSize: '80%' }}>
                            - {moment(client.date).format('DD/MM/YYYY')}
                          </Typography>
                        </Box>
                      )
                    }
                    action={<IsolatedMenuPCreated id={_id} />}
                  />
                </Grid>
              )
            }
          })}
        </Grid>
      )}
    </>
  )
}

export default ProjectCard
