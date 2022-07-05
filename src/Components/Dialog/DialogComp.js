import { Button, Grid, Box, InputLabel, FormControl, IconButton, FormHelperText } from '@mui/material'
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

const DialogComp = ({ open, handleClose }) => {
  const btnstyle = { margin: '2%', backgroundColor: '#FFE600', color: '#1A1A24' }
  const queryKey = ['clientsAdd']

  const [avatar, setAvatar] = useState('')

  const initialValues = { name: '', email: '', description: '', priority: '' }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const [fileErrorsMessage, setfileErrorsMessage] = useState('')
  const [fileErrors, setfileErrors] = useState(null)

  const handleChangeForm = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const isValidFileUploaded = file => {
    const validExtensions = ['png', 'jpeg', 'jpg']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }

  const fileChange = e => {
    const file = e.target.files[0]

    if (!isValidFileUploaded(file)) {
      setfileErrorsMessage('Please select a valide file')
      setfileErrors(false)
    } else {
      setAvatar(file)
      setfileErrors(true)
    }
  }

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    queryKey,
    async formData => {
      const resp = await axios.post('clients', formData)
      return resp.data
    },
    {
      onSuccess: async data => {
        queryClient.invalidateQueries('clientsdata')
      },
      onError: async error => {},
    },
  )

  const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Name is required'
    }
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!validator.isEmail(formValues.email)) {
      errors.email = 'Enter valid Email!'
    }
    if (!values.description) {
      errors.description = 'Description is required'
    }
    if (!values.priority) {
      errors.priority = 'Priority is required'
    }

    return errors
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit && fileErrors) {
      const formData = new FormData()

      formData.append('name', formValues.name)
      formData.append('email', formValues.email)
      formData.append('priority', formValues.priority)
      formData.append('description', formValues.description)
      formData.append('avatar', avatar)

      mutate(formData)
      handleClose()
    }
  }, [formErrors])

  const handleClientAdd = async e => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    if (avatar < 1) {
      setfileErrorsMessage('Please select an image')
      setfileErrors(false)
    }
    setIsSubmit(true)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Add client</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container sx={{ '& .MuiTextField-root': { m: 1, width: '85%' } }}>
          <Grid item xs={6}>
            <TextField
              value={formValues.name}
              name="name"
              error={formErrors.name?.length > 0}
              helperText={formErrors.name}
              onChange={handleChangeForm}
              label="Client name"
              type="text"
              variant="outlined"
            />
            <TextField
              value={formValues.email}
              error={formErrors.email?.length > 0}
              onChange={handleChangeForm}
              helperText={formErrors.email}
              label="Email"
              name="email"
              type="email"
              variant="outlined"
            />
            <TextField
              label=""
              type="file"
              error={fileErrors === false}
              helperText={fileErrorsMessage}
              variant="outlined"
              onChange={fileChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Description"
              value={formValues.description}
              error={formErrors.description?.length > 0}
              helperText={formErrors.description}
              onChange={handleChangeForm}
              type="text"
              name="description"
              variant="outlined"
              multiline
              rows={4}
            />
            <FormControl sx={{ m: 1, minWidth: 200 }} error={formErrors.priority?.length > 0}>
              <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={formValues.priority}
                name="priority"
                label="priority"
                onChange={handleChangeForm}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
              <FormHelperText>{formErrors.priority}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClientAdd} startIcon={<AddIcon />} style={btnstyle}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogComp
