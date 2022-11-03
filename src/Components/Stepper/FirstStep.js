import { Box, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import axios from 'axios'

const Firststep = (props, formErrors, isSubmit) => {
  const handleChangeForm = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const [deadline, setdeadline] = useState(new Date(moment().format('DD-MM-YYYY hh:mm:ss')))
  const initialValues = { manager: '', description: '', deadline }
  const [formValues, setFormValues] = useState(initialValues)
  const [fistStepFormErrors, setFistStepFormErrors] = useState(formErrors)

  const handleChange = deadline => {
    setdeadline(deadline)
  }

  useEffect(() => {
    if (isSubmit) {
      console.log('is Submit')
    }
    console.log(formErrors)
  }, [isSubmit, formErrors])

  useEffect(() => {
    props.getprojectDetails(formValues)
    setFistStepFormErrors(formErrors)
    console.log(isSubmit)
  }, [formValues, formErrors])

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
  console.log(formErrors)
  return (
    <>
      {data && (
        <Box
          sx={{
            padding: 1,
            margin: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Project details
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: '1%' }}>
            <Grid item xs={6} rowSpacing={1}>
              <FormControl required fullWidth>
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
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack sx={{ marginTop: '3%' }}>
                  <FormControl required fullWidth>
                    <DesktopDatePicker
                      label="Deadline"
                      error={formErrors.deadline?.length > 0}
                      helperText={formErrors.deadline}
                      onChange={handleChange}
                      value={deadline}
                      inputFormat="MM/dd/yyyy"
                      name="deadline"
                      renderInput={params => <TextField {...params} />}
                    />
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
                error={formErrors.description}
                helperText={formErrors.description}
                onChange={handleChangeForm}
                value={formValues.description}
                multiline
                fullWidth
                rows={6}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default Firststep
