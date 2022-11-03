import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'

const IsolatedMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async cellValue => {
      const resp = axios.delete(`projects/${cellValue}`)
      return resp.data
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries('projectsdata')
        }, 500)
      },
      onError: async error => {
        console.log(error)
      },
    },
  )

  return (
    <React.Fragment>
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
            mutate(props.id)
            setAnchorEl(null)
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" /> Delete
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default IsolatedMenu
