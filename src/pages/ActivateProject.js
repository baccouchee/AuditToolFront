import { Box, Step, StepLabel, Stepper, Button, Container, Paper, Typography, CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import DrawerPerm from '../Components/Drawer/DrawerPerm'
import Firststep from '../Components/Stepper/FirstStep'
import Secondstep from '../Components/Stepper/SecondStep'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

const ActivateProject = () => {
  const pull_data = data => {
    console.log('hahahaha', data) // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  }

  const [activeStep, setActiveStep] = useState(0)
  const token = localStorage.getItem('thisismynewcourse')
  const navigate = useNavigate()

  const previousStep = () => {
    if (activeStep !== 0) setActiveStep(currentStep => currentStep - 1)
  }
  const nextStep = () => {
    if (activeStep < 1) setActiveStep(currentStep => currentStep + 1)
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
        <DrawerPerm pagename="Activate your project">
          <Box
            sx={{
              padding: 1,
              margin: 1,
            }}
          >
            <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
              <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Stepper activeStep={activeStep}>
                  <Step>
                    <StepLabel>Project approval</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Creation of the work program</StepLabel>
                  </Step>
                </Stepper>
                {activeStep === 0 ? <Firststep getprojectDetails={pull_data} /> : <Secondstep />}

                <Button disabled={activeStep === 0} onClick={() => previousStep()}>
                  Back
                </Button>
                {activeStep < 1 && <Button onClick={() => nextStep()}>Next</Button>}
                {activeStep === 1 && <Button>Validate</Button>}
              </Paper>
            </Container>
          </Box>
        </DrawerPerm>
      )}
    </div>
  )
}

export default ActivateProject
