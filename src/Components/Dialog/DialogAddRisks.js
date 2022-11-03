import { Button, Box, TextField, IconButton, FormHelperText } from '@mui/material'
import React, { useState, Component, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'

const DialogAddRisk = ({ open, handleClose, _id }) => {
  const btnstyle = { backgroundColor: '#FFE600', color: '#1A1A24' }

  const [name, setname] = React.useState({})
  const [formErrors, setFormErrors] = React.useState('')
  const [submit, setSubmit] = React.useState(false)
  const queryClient = useQueryClient()

  const { workprogram } = useParams()
  const { mutate: mutateDate } = useMutation(() =>
    axios.patch(`workprograms/updateTimeStamp/${workprogram}`, {
      onSuccess: async data => {
        console.log(data)
      },
      onError: async error => {
        console.log(error)
      },
    }),
  )

  const { mutate } = useMutation(
    async formData => {
      const resp = await axios.post(`risk/${_id}`, formData)
      return resp.data
    },
    {
      onSuccess: async data => {
        console.log(data)
        queryClient.invalidateQueries('subStreamData')
      },
      onError: async error => {
        console.log(error)
      },
    },
  )

  const handleChangeForm = e => {
    const { name, value } = e.target
    setname({ [name]: value })
    setFormErrors('')
  }
  const submitForm = () => {
    if (!name.name) {
      console.log('error')
      setFormErrors('Sub-Stream Field Is Required')
    } else {
      setSubmit(true)
      console.log(Object.keys(formErrors).length)
    }
  }

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && submit) {
      console.log(name)
      mutate(name)
      mutateDate()
      setSubmit(false)
      setname({})
      handleClose()
    }
  }, [formErrors, submit])

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Add a new Risk</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          required
          label="Risk"
          type="text"
          name="name"
          error={formErrors?.length > 0}
          helperText={formErrors}
          variant="outlined"
          onChange={handleChangeForm}
          value={name.name}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button startIcon={<AddIcon />} onClick={submitForm} style={btnstyle}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAddRisk
