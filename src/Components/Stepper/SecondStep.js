import { Box, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Stack, Chip } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useState } from 'react'
import moment from 'moment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useQuery } from 'react-query'
import axios from 'axios'

const Secondstep = projectDetailsValue => {
  const handleChangeForm = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    // On autofill we get a stringified value.
  }

  const names = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard']

  const [senior, setSenior] = useState([])
  const [junior, setJunior] = useState([])

  const [dateValue, setDateValue] = useState(new Date(moment().format('DD-MM-YYYY hh:mm:ss')))

  const handleChangeSetSenior = event => {
    const {
      target: { value },
    } = event
    setSenior(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const handleChangeSetJunior = event => {
    const {
      target: { value },
    } = event
    setJunior(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const workProgramValues = { name: '', description: '', junior, priority: '', senior, dateValue }
  const [formValues, setFormValues] = useState(workProgramValues)

  console.log(projectDetailsValue)
  const handleChange = dateValue => {
    setDateValue(dateValue)
  }

  const { data } = useQuery('seniorusers', () =>
    axios.get('users/senior', {
      onSuccess: async data => {
        console.log(data)
      },
      onError: async error => {
        console.log(error)
      },
    }),
  )

  const {
    isLoading,
    data: datajunior,
    error,
  } = useQuery('juniorusers', () =>
    axios.get('users/junior', {
      onSuccess: async data => {
        console.log(data)
      },
      onError: async error => {
        console.log(error)
      },
    }),
  )

  return (
    <>
      {data && datajunior && (
        <Box
          sx={{
            padding: 1,
            margin: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create your first work program
          </Typography>
          <Grid container spacing={3} sx={{ marginTop: '1%' }}>
            <Grid item xs={6} rowSpacing={1}>
              <TextField
                required
                label="Work program name"
                type="text"
                name="name"
                variant="outlined"
                onChange={handleChangeForm}
                value={formValues.name}
                fullWidth
              />
              <FormControl required fullWidth sx={{ marginTop: '3%' }}>
                <InputLabel id="senior">Senior auditeur</InputLabel>
                <Select
                  labelId="senior"
                  id="senior"
                  label="Senior auditeur"
                  multiple
                  value={senior}
                  onChange={handleChangeSetSenior}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(name => (
                        <Chip key={name} label={name} />
                      ))}
                    </Box>
                  )}
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
              <FormControl required fullWidth sx={{ marginTop: '3%' }}>
                <InputLabel id="junior">Junior auditeur</InputLabel>
                <Select
                  labelId="junior"
                  id="sejuniornior"
                  label="Junior auditeur"
                  multiple
                  value={junior}
                  onChange={handleChangeSetJunior}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {datajunior.data.map(({ name, _id }) => {
                    return (
                      <MenuItem key={name} value={_id}>
                        {name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              <FormControl required fullWidth sx={{ marginTop: '3%' }}>
                <InputLabel id="priority">Priority</InputLabel>
                <Select
                  labelId="priority"
                  id="priority"
                  value={formValues.priority}
                  name="priority"
                  label="Priority"
                  onChange={handleChangeForm}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <FormControl required fullWidth>
                    <DesktopDatePicker
                      label="Deadline"
                      onChange={handleChange}
                      value={dateValue}
                      inputFormat="MM/dd/yyyy"
                      name="deadline"
                      renderInput={params => <TextField {...params} />}
                    />
                  </FormControl>
                </Stack>
              </LocalizationProvider>
              <TextField
                required
                sx={{ marginTop: '3%' }}
                id="cardNumber"
                label="Description"
                type="text"
                name="description"
                variant="outlined"
                value={formValues.description}
                onChange={handleChangeForm}
                multiline
                fullWidth
                rows={7}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default Secondstep
