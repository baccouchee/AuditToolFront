import { Card, Grid, CardHeader, Avatar, Typography } from '@mui/material'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { Buffer } from 'buffer'
import { Box } from '@mui/system'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import './basic.css'

const DeadLineProject = () => {
  const { data } = useQuery('deadlineWP', () =>
    axios.get('workprograms/sort/deadline/62c447cc4c98586e801e3a56', {
      onSuccess: async data => {
        console.log(data)
      },
      onError: async err => {
        console.log(err)
      },
    }),
  )

  const navigate = useNavigate()
  const handleClickOpenWorkProgram = id => {
    navigate(`/projects/workprogram/rcm/${id}`)
  }

  return (
    <>
      {data && (
        <Box
          sx={{
            display: 'flex',
            overflow: 'auto',

            height: '100%',
            flexDirection: 'row',
          }}
          className={'mostly-customized-scrollbar'}
        >
          {data.data.map((i, index, onClick) => {
            return (
              <Box
                component={Card}
                style={{ transitionDuration: '0.3s' }}
                onClick={() => handleClickOpenWorkProgram(i._id)}
                sx={{
                  borderRadius: '2px',
                  marginTop: '2%',
                  marginRight: '2%',
                  marginBottom: '2%',
                  minWidth: '20%',
                  ':hover': {
                    cursor: 'pointer',
                    background: '#D9D9D9',
                    transition: '0.3s',
                  },
                }}
                key={index}
              >
                <>
                  {i.project?.client?.avatar && (
                    <CardHeader
                      sx={{ width: '100%' }}
                      avatar={
                        <Avatar
                          variant="rounded"
                          sx={{ width: 40, height: 40 }}
                          src={`data:${i.project?.client};base64, ${Buffer.from(
                            i.project?.client?.avatar?.data,
                          ).toString('base64')}`}
                        />
                      }
                      subheader={
                        <Typography
                          style={{
                            fontWeight: 'medium',
                            width: '100%',
                            color: 'grey',
                            fontSize: '80%',
                            textAlign: 'left',
                          }}
                        >
                          {'Updated ' + moment(i.updatedAt, 'YYYY-MM-DD HH:mm:ss').fromNow()}
                        </Typography>
                      }
                      title={
                        <Typography
                          style={{
                            fontWeight: 500,
                            width: '100%',
                            fontSize: '80%',
                          }}
                        >
                          {i.project?.client?.name} - {i.name}
                        </Typography>
                      }
                    />
                  )}
                </>
              </Box>
            )
          })}
        </Box>
      )}
    </>
  )
}

export default DeadLineProject
