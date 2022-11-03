import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Dialog, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'
import DialogAddRisk from '../Dialog/DialogAddRisks'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const IsolatedMenuRisk = props => {
  const [openAdd, setOpenAdd] = React.useState(false)

  const handleClickOpen = () => {
    setOpenAdd(true)
  }

  const handleClose = () => {
    setOpenAdd(false)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async cellValue => {
      const resp = axios.delete(`subStream/${cellValue}`)
      return resp.data
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries('subStreamData')
        }, 500)
      },
      onError: async error => {
        console.log(error)
      },
    },
  )

  return (
    <React.Fragment>
      <DialogAddRisk open={openAdd} handleClose={handleClose} _id={props.id} />
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        elevation={0}
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setOpenAdd(true)
          }}
        >
          <ListItemIcon>
            <AddIcon fontSize="small" sx={{ marginRight: 1 }} /> Add Risk
          </ListItemIcon>
        </MenuItem>

        <MenuItem
          onClick={() => {
            mutate(props.id)
            setAnchorEl(null)
          }}
        >
          <ListItemIcon>
            <RemoveIcon fontSize="small" sx={{ marginRight: 1 }} /> Delete SubStream
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default IsolatedMenuRisk
