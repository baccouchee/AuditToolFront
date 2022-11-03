import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Button,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Toolbar,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import DrawerPerm from '../Components/Drawer/DrawerPerm'
import Firststep from '../Components/Stepper/FirstStep'
import Secondstep from '../Components/Stepper/SecondStep'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const ActivateProject = () => {
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const { id } = useParams()

  const [projectDetailsValue, setProjectDetailsValue] = useState({})
  const [workprogramValue, setWorkprogramValue] = useState({})

  const [activeStep, setActiveStep] = useState(0)
  const token = localStorage.getItem('thisismynewcourse')
  const navigate = useNavigate()

  const { mutate } = useMutation(
    async workprogramData => {
      const resp = await axios.post(`workprogram/${id}`, workprogramData)
      return resp.data
    },
    {
      onSuccess: async data => {},
      onError: async error => {},
    },
  )

  const { mutate: mutateProjects } = useMutation(
    async projectsData => {
      const resp = await axios.patch(`projects/${id}`, projectsData)
      return resp.data
    },
    {
      onSuccess: async data => {},
      onError: async error => {},
    },
  )

  const validateFirstStep = values => {
    const errors = {}
    if (!values.manager) {
      errors.name = 'Manager is required'
    }
    if (!values.description) {
      errors.email = 'Description is required'
    }
    if (!values.deadline) {
      errors.description = 'Deadline is required'
    }

    return errors
  }

  const validateSteps = () => {
    mutateProjects(projectDetailsValue)
    mutate(workprogramValue)

    navigate('/projects/workprogram/' + id)
  }
  const previousStep = () => {
    if (activeStep !== 0) setActiveStep(currentStep => currentStep - 1)
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setActiveStep(currentStep => currentStep + 1)
    }
  }, [formErrors])

  const nextStep = () => {
    if (activeStep < 1) {
      setFormErrors(validateFirstStep(projectDetailsValue))
      setIsSubmit(true)
    }
    console.log(projectDetailsValue)
    console.log(formErrors)
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
          <Toolbar />
          <Box
            sx={{
              padding: 1,
              margin: 1,
            }}
          >
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
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
                {activeStep === 0 ? (
                  <Firststep getprojectDetails={setProjectDetailsValue} formErrors={formErrors} isSubmit={isSubmit} />
                ) : (
                  <Secondstep getWorkProgram={setWorkprogramValue} />
                )}

                <Button disabled={activeStep === 0} onClick={() => previousStep()}>
                  Back
                </Button>
                {activeStep < 1 && <Button onClick={() => nextStep()}>Next</Button>}
                {activeStep === 1 && <Button onClick={() => validateSteps()}>Validate</Button>}
              </Paper>
            </Container>
          </Box>
        </DrawerPerm>
      )}
    </div>
  )
}

export default ActivateProject
