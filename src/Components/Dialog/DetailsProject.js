import { Button, Chip, DialogContentText, Typography, Avatar, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import moment from 'moment'
import { Buffer } from 'buffer'

const DetailsProject = ({ open, handleClose, i }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Project Details</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Avatar
              variant="rounded"
              sx={{ width: 70, height: 70 }}
              src={`data:${i.client};base64, ${Buffer.from(i.client.avatar.data).toString('base64')}`}
            />
            <Box
              sx={{
                marginLeft: 1,
              }}
            >
              <Typography>{i.client.name}</Typography>
              <Typography
                style={{
                  fontWeight: 'medium',
                  width: '100%',
                  color: 'grey',
                  fontSize: '80%',
                  textAlign: 'left',
                }}
              >
                {moment(i.deadline).format('DD/MM/YYYY')}
              </Typography>
              <Chip
                label={i.status}
                variant="outlined"
                size="small"
                sx={{ marginTop: '3%', textTransform: 'uppercase', fontSize: '80%' }}
                color="error"
              />
            </Box>
          </Box>

          <DialogContentText sx={{ marginTop: 2 }}>{i.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DetailsProject
