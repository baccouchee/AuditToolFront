import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  FormHelperText,
} from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const DialogProject = ({ open, handleClose }) => {
  const btnstyle = { backgroundColor: '#FFE600', color: '#1A1A24' }

  const handleChangeForm = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const [deadline, setdeadline] = useState(new Date())

  const initialValues = { manager: '', description: '', deadline, client: '' }
  const [formValues, setFormValues] = useState(initialValues)

  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const validate = values => {
    const errors = {}
    if (!values.manager) {
      errors.manager = 'Manager is required'
    }
    if (!values.client) {
      errors.client = 'Client is required'
    }
    if (!values.description) {
      errors.description = 'Description is required'
    }
    if (!values.deadline) {
      errors.deadline = 'Deadline is required'
    }

    return errors
  }

  const queryClient = useQueryClient()
  const handleChange = deadline => {
    setdeadline(deadline)
  }

  const { isLoading, data, error } = useQuery('managerusers', () =>
    axios.get('users/manager', {
      onSuccess: async data => {
        console.log(data)
      },
      onError: async error => {
        console.log(error)
      },
    }),
  )
  const { data: ClientData } = useQuery('clientdatadropdown', () =>
    axios.get('clients/all', {
      onSuccess: async data => {
        console.log(data)
      },
      onError: async error => {
        console.log(error)
      },
    }),
  )

  const { mutate: mutateProjects } = useMutation(
    async projectsData => {
      const resp = await axios.post('projects', projectsData)
      return resp.data
    },
    {
      onSuccess: async data => {
        queryClient.invalidateQueries('projectsdata')
      },
      onError: async error => {},
    },
  )

  const handleClickSubmitProject = async e => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
    console.log(formValues)
    console.log(formErrors)
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      mutateProjects(formValues)
      handleClose()
    }
  }, [formErrors])

  console.log(formValues)
  return (
    <>
      {data && ClientData && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>Create the project</Box>
              <Box>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={6} rowSpacing={1}>
                <FormControl required fullWidth error={formErrors.manager?.length > 0}>
                  <InputLabel id="manager">Manager</InputLabel>
                  <Select
                    labelId="manager"
                    id="manager"
                    value={formValues.manager}
                    name="manager"
                    label="Manager"
                    onChange={handleChangeForm}
                  >
                    {data.data.map(({ name, _id }) => {
                      return (
                        <MenuItem key={name} value={_id}>
                          {name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  <FormHelperText>{formErrors.manager}</FormHelperText>
                </FormControl>
                <FormControl required fullWidth sx={{ marginTop: '3%' }} error={formErrors.client?.length > 0}>
                  <InputLabel id="client">Client </InputLabel>
                  <Select
                    labelId="client"
                    id="client"
                    value={formValues.client}
                    name="client"
                    label="Client"
                    onChange={handleChangeForm}
                  >
                    {ClientData.data.map(({ email, _id }) => {
                      return (
                        <MenuItem key={_id} value={_id}>
                          {email}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  <FormHelperText>{formErrors.client}</FormHelperText>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack sx={{ marginTop: '3%' }}>
                    <FormControl required fullWidth error={formErrors.deadline?.length > 0}>
                      <DesktopDatePicker
                        label="Deadline"
                        onChange={handleChange}
                        value={deadline}
                        inputFormat="MM/dd/yyyy"
                        name="deadline"
                        renderInput={params => <TextField {...params} />}
                      />
                      <FormHelperText>{formErrors.deadline}</FormHelperText>
                    </FormControl>
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="Description"
                  type="text"
                  name="description"
                  variant="outlined"
                  error={formErrors.description?.length > 0}
                  helperText={formErrors.description}
                  onChange={handleChangeForm}
                  value={formValues.description}
                  multiline
                  fullWidth
                  rows={6}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClickSubmitProject} startIcon={<AddIcon />} style={btnstyle}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default DialogProject
