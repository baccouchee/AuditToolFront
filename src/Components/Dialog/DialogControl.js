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

const DialogControl = ({ open, handleClose, idRisk }) => {
  const btnstyle = { backgroundColor: '#FFE600', color: '#1A1A24' }

  const [control, setcontrol] = React.useState({})
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
      const resp = await axios.post(`control/${idRisk}`, formData)
      return resp.data
    },
    {
      onSuccess: async data => {
        queryClient.invalidateQueries('subStreamData')
      },
      onError: async error => {
        console.log(error)
      },
    },
  )

  const handleChangeForm = e => {
    const { name, value } = e.target
    setcontrol({ [name]: value })
    setFormErrors('')
  }
  const submitForm = () => {
    if (!control.control) {
      console.log('error')
      setFormErrors('Control Field Is Required')
    } else {
      setSubmit(true)
      // console.log(control)
      // console.log(Object.keys(formErrors).length)
    }
  }

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && submit && idRisk) {
      // console.log(control)
      mutate(control)
      mutateDate()
      setcontrol({})
      setSubmit(false)
      handleClose()
    }
  }, [formErrors, submit])

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Add a new Control</Box>
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
          label="Control"
          type="text"
          name="control"
          error={formErrors?.length > 0}
          helperText={formErrors}
          variant="outlined"
          onChange={handleChangeForm}
          value={control.control}
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

export default DialogControl
