import { Button, Grid, Box, InputLabel, FormControl, Breadcrumbs, Typography, Link, IconButton } from '@mui/material'
import React, { useState } from 'react'
import DataGridDemo from '../Components/DataGrid/DataGrid'
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import CloseIcon from '@mui/icons-material/Close'
import DrawerPerm from '../Components/Drawer/DrawerPerm'

const Clients = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [age, setAge] = React.useState('')

  const handleChange = event => {
    setAge(event.target.value)
  }
  const styles = {
    display: 'flex',
    flexDirection: 'column',
  }

  const stylesRow = {
    display: 'flex',
    flexDirection: 'row',
  }
  const btnstyle = { margin: '2%', backgroundColor: '#FFE600', color: '#1A1A24' }
  return (
    <DrawerPerm>
      <Box
        sx={{
          padding: 1,
          margin: 1,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="#">
            MUI
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Core
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>

        <Box
          sx={{
            padding: 2,
            margin: 2,
          }}
        >
          <Button variant="contained" type="submit" style={btnstyle} startIcon={<AddIcon />} onClick={handleClickOpen}>
            Add client
          </Button>

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
                  <TextField id="outlined-basic" label="Client name" type="text" variant="outlined" />
                  <TextField id="outlined-basic" label="Email" type="email" variant="outlined" />
                  <TextField id="outlined-basic" label="" type="file" variant="outlined" />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Description"
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
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>High</MenuItem>
                      <MenuItem value={20}>Normal</MenuItem>
                      <MenuItem value={30}>Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} startIcon={<AddIcon />} style={btnstyle}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <DataGridDemo />
        </Box>
      </Box>
    </DrawerPerm>
  )
}

export default Clients
