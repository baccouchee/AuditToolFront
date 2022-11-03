import { Button, Grid, Box, InputLabel, FormControl, IconButton, FormHelperText, Stack, Chip } from '@mui/material'
import React, { useState, Component, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import validator from 'validator'
import { useNavigate, useParams } from 'react-router-dom'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import moment from 'moment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useQuery } from 'react-query'

const DialogEditWP = ({ open, handleClose, rowId }) => {
  const btnstyle = { backgroundColor: '#FFE600', color: '#1A1A24' }
  const queryClient = useQueryClient()

  const { data: ediData } = useQuery('dataeditwp', () =>
    axios.get(`workprogram/edit/${rowId}`, {
      onSuccess: async data => {
        console.log(data)
      },
      onError: async error => {
        console.log(error)
      },
    }),
  )

  const { mutate: mutateWorkProgram } = useMutation(
    async projectsData => {
      const resp = await axios.patch(`workprograms/edit/${rowId}`, projectsData)
      return resp.data
    },
    {
      onSuccess: async data => {
        queryClient.invalidateQueries('workprogramdata')
      },
      onError: async error => {},
    },
  )

  const handleClickSubmitWP = () => {
    mutateWorkProgram(formValues)
    handleClose()
  }
  const handleChangeForm = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const findChipName = (data, id) => {
    const test = data.find(e => e._id === id)
    return test?.name
  }

  const [deadline, setdeadline] = useState(new Date())

  const workProgramValues = { name: '', description: '', junior: [], priority: '', senior: [], deadline }
  const [formValues, setFormValues] = useState(workProgramValues)

  useEffect(() => {
    axios.get(`workprogram/edit/${rowId}`).then(response => {
      const jr = []
      response.data.junior.map((item, i) => {
        jr.push(response.data?.junior[i]?.name)
      })
      if (jr.length > 1) {
        setFormValues({
          name: response.data.name,
          description: response.data.description,
          junior: jr,
          priority: response.data.priority,
          senior: [],
          deadline,
        })
      }
    })
  }, [rowId])

  const handleChange = deadline => {
    setdeadline(deadline)
  }

  const handleChangeSetSenior = event => {
    const {
      target: { value },
    } = event
    setFormValues({ ...formValues, senior: typeof value === 'string' ? value.split(',') : value })

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

  return (
    <>
      {rowId && data && datajunior && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>Create work program</Box>
              <Box>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
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
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClickSubmitWP} startIcon={<AddIcon />} style={btnstyle}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default DialogEditWP
