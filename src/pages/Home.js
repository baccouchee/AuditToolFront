import { Toolbar, Box } from '@mui/material'
import React from 'react'
import BarChart from '../Components/Charts/BarChart'
import Card from '../Components/Charts/Cards/Card'
import LineChart from '../Components/Charts/lineChart'
import PieChart from '../Components/Charts/pieChart'
import PriorityCharts from '../Components/Charts/PriorityCharts'
import StatClient from '../Components/Charts/statClient'
import LastClient from '../Components/Dashboard/LastClient'
import DrawerPerm from '../Components/Drawer/DrawerPerm'
import HomeTab from './HomeTab'

const Home = () => {
  const [selectedTab, setSelectedTab] = React.useState('Overview')
  return (
    <DrawerPerm pagename="Client Dashboard">
      <Toolbar />
      <div className="ml-2">
        <HomeTab setSelectedTab={setSelectedTab} />
      </div>

      <div className="flex justify-between pt-3 pl-3">
        {selectedTab === 'Overview' && (
          <div className=" flex-col w-full">
            <div className="flex justify-around align-middle">
              <div className="flex-col w-full pr-3 ">
                <p className=" text-xl mb-2">Last Clients</p>
                <div className="bg-white">
                  <LastClient />
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedTab === 'Charts' && (
          <div className="flex-col w-full">
            <div className="flex justify-around align-middle">
              <div className="flex-col w-full pr-3 ">
                <p className=" text-xl mb-2">Charts</p>
                <div className="flex flex-col justify-around lg:flex-row">
                  <div className=" w-1/4 md:w-1/3">
                    <p className=" w-full text-lg ">Projects by progress state</p>

                    <PieChart />
                  </div>
                  <div className="w-1/4 md:w-1/3">
                    <BarChart />
                  </div>
                </div>
                <div className="flex flex-col justify-around lg:flex-row">
                  <div className="w-1/4 md:w-1/3">
                    <PriorityCharts />
                  </div>
                  <div className="w-1/4 md:w-1/3">
                    <PriorityCharts />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-1/5 flex-col h-screen mr-2">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </DrawerPerm>
  )
}

export default Home
