import React from 'react'
import DrawerPerm from '../Components/Drawer/DrawerPerm'
import { Box } from '@mui/material'
const Workprogram = () => {
  return (
    <DrawerPerm pagename="Activate your project">
      <Box
        sx={{
          padding: 1,
          margin: 1,
        }}
      >
        <p>work programs</p>
      </Box>
    </DrawerPerm>
  )
}

export default Workprogram
