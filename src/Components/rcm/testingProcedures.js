import { Box, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'

const TestingProcedures = ({ clickedControl, clickedRisk, setclickedControl }) => {
  const [testP, setTestP] = React.useState('')
  const [testPro, setTestPro] = React.useState('')

  React.useEffect(() => {
    if (clickedControl) {
      axios
        .get(`control/name/${clickedControl}`)
        .then(function (response) {
          setTestP(response.data)
          setTestPro(response.data.testPro)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [clickedControl])

  React.useEffect(() => {
    if (clickedRisk) {
      setclickedControl(false)
    }
  }, [clickedRisk])

  React.useEffect(() => {
    axios
      .patch(`control/testPro/${clickedControl}`, { testPro })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [testPro])

  return (
    <>
      {clickedControl ? (
        <Box m={2}>
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'black', fontSize: 'bold' }}>
              Control :
            </Typography>
            <Typography variant="body1" sx={{ color: 'Grey' }}>
              {testP.control}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'black', fontSize: 'bold', marginTop: 1 }}>
              Testing Procedures :
            </Typography>
            <TextField
              sx={{ background: 'white' }}
              value={testPro}
              onChange={e => setTestPro(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          sx={{ flexDirection: 'column' }}
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
        >
          <img src="/notfound.jpg" width="40%" height="40%" alt="image" />
          <Typography sx={{ color: 'Grey' }}>No Control Selected Yet !</Typography>
        </Box>
      )}
    </>
  )
}

export default TestingProcedures
