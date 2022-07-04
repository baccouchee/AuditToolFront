import { Button, Grid, Box, InputLabel, FormControl, IconButton, Avatar, InputAdornment } from '@mui/material'
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
import { useMutation, useQueryClient, useQuery } from 'react-query'
import axios from 'axios'
import { Buffer } from 'buffer'

const DialogEdit = ({ open, handleClose, rowId }) => {
  const btnstyle = { margin: '2%', backgroundColor: '#FFE600', color: '#1A1A24' }

  const [priority, setpriority] = useState('')
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [description, setdescription] = useState('')
  const [avatar, setavatar] = useState('')
  const [avatarr, setavatarr] = useState('')
  const queryClient = useQueryClient()

  const handleChange = event => {
    setpriority(event.target.value)
  }

  const handleEdit = () => {
    axios
      .patch(`Clients/${rowId}`, { priority, name, email, description })
      .then(function (response) {
        queryClient.invalidateQueries('clientsdata')
        console.log(response)
        handleClose()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    if (open) {
      axios
        .get(`Clients/${rowId}`)
        .then(function (response) {
          setname(response.data.name)
          setemail(response.data.email)
          setdescription(response.data.description)
          setpriority(response.data.priority)
          setavatar(response.data.avatar.data)
          setavatarr(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [open])

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Edit client</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: 300,
            borderRadius: 1,
          }}
        ></Box>

        <Grid container sx={{ '& .MuiTextField-root': { m: 1, width: '85%' } }}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              value={name}
              onChange={e => setname(e.target.value)}
              label="Client name"
              type="text"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              value={email}
              onChange={e => setemail(e.target.value)}
              label="Email"
              type="email"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label=""
              type="file"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Avatar src={`data:${avatarr};base64, ${Buffer.from(avatar).toString('base64')}`} />
                  </InputAdornment>
                ),
              }}
              onChange={e => setavatar(e.target.files[0])}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Description"
              value={description}
              onChange={e => setdescription(e.target.value)}
              type="text"
              variant="outlined"
              multiline
              rows={4}
            />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={priority}
                label="priority"
                onChange={handleChange}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleEdit} startIcon={<AddIcon />} style={btnstyle}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogEdit
