import { height } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useQuery } from 'react-query'
import axios from 'axios'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const StatClient = () => {
  const [chartData, setChartData] = useState({ datasets: [] })
  const [clients, setClients] = useState([])
  const [chartOptions, setChartOptions] = useState({})
  const { isLoading, data, error, isFetched, refetch } = useQuery('clientsdata', () => axios.get('clients/all'), {
    onSuccess: () => {
      setClients(data?.data)
    },
  })

  const uniqueStatus = [...new Set(data?.data.map(item => item.priority))]
  //get unique status count from data
  const uniqueStatusCount = uniqueStatus.map(priority => {
    return data?.data.filter(item => item.priority === priority).length
  })

  let datas = {
    labels: uniqueStatus || [],
    datasets: [
      {
        label: 'My First Dataset',
        data: uniqueStatusCount,
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div>
      <Pie data={datas} />
    </div>
  )
}

export default StatClient
