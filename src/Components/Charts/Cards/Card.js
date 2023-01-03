import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import { Grid } from '@mui/material'
import { yellow } from '@mui/material/colors'

const Card = tab => {
  const [documents, setDocuments] = React.useState('')

  React.useEffect(() => {
    if (tab) {
      console.log(tab)
      axios
        .get(`${tab.tab}/documents`)
        .then(function (response) {
          setDocuments(response.data?.documents)
          console.log(documents)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [tab])

  return (
    <>
      {documents && (
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 my-4">
          <Grid container>
            <Grid item xs={8}>
              <dt className="truncate text-sm font-medium text-gray-500 text-green">{tab.tab}</dt>
            </Grid>
            <Grid
              item
              xs={4}
              style={{ display: 'flex', flexDirection: 'row-reverse', alignContent: 'center', textAlign: 'left' }}
            >
              <LeaderboardIcon sx={{ color: yellow[500] }} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{documents}</dd>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  )
}

export default Card
