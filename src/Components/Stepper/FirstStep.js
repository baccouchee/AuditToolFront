import { Box, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useState } from 'react'
import moment from 'moment'

const Firststep = props => {
  const handleChangeForm = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const [dateValue, setDateValue] = useState(new Date(moment().format('DD-MM-YYYY hh:mm:ss')))
  const initialValues = { manager: '', description: '', dateValue }
  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = dateValue => {
    setDateValue(dateValue)
  }

  props.getprojectDetails(formValues)
  return (
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
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack sx={{ marginTop: '3%' }}>
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
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="cardNumber"
            label="Description"
            type="text"
            name="description"
            variant="outlined"
            onChange={handleChangeForm}
            value={formValues.description}
            multiline
            fullWidth
            rows={6}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Firststep
