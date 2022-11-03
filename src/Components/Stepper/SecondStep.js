import { Box, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Stack, Chip } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useQuery } from 'react-query'
import axios from 'axios'

const Secondstep = props => {
  const handleChangeForm = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const findChipName = (data, id) => {
    const test = data.find(e => e._id === id)
    return test.name
  }

  const [deadline, setdeadline] = useState(new Date(moment().format('DD-MM-YYYY hh:mm:ss')))

  const workProgramValues = { name: '', description: '', junior: [], priority: '', senior: [], deadline }
  const [formValues, setFormValues] = useState(workProgramValues)

  useEffect(() => {
    props.getWorkProgram(formValues)
  }, [formValues])

  const handleChange = deadline => {
    setdeadline(deadline)
  }

  const handleChangeSetSenior = event => {
    const {
      target: { value },
    } = event
    setFormValues({ ...formValues, senior: typeof value === 'string' ? value.split(',') : value })
    console.log(value)
    findChipName(data?.data, value[0])
  }

  const handleChangeSetJunior = event => {
    const {
      target: { value },
    } = event
    setFormValues({ ...formValues, junior: typeof value === 'string' ? value.split(',') : value })
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

  console.log(formValues)
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
                  value={formValues.senior}
                  onChange={handleChangeSetSenior}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={findChipName(data?.data, value)} />
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
                  value={formValues.junior}
                  onChange={handleChangeSetJunior}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={findChipName(datajunior?.data, value)} />
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
                      value={deadline}
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
