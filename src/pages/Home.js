import { Toolbar, Box } from '@mui/material'
import React from 'react'
import LineChart from '../Components/Charts/lineChart'
import PieChart from '../Components/Charts/pieChart'
import StatClient from '../Components/Charts/statClient'
import DrawerPerm from '../Components/Drawer/DrawerPerm'

const Home = () => {
  return (
    <DrawerPerm pagename="Client Dashboard">
      <Toolbar />
      <Box
        sx={{
          padding: 1,
          margin: 1,
        }}
      >
        <Box style={{ width: '40%' }}>
          <StatClient />
        </Box>
        <Box style={{ width: '40%' }}>
          <LineChart />
        </Box>
        <Box style={{ width: '40%' }}>
          <PieChart />
        </Box>
      </Box>
    </DrawerPerm>
  )
}

export default Home
