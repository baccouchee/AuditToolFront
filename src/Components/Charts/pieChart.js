import { height } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { CategoryScale, ArcElement, Tooltip, Legend } from 'chart.js'
import { Line, Pie, Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

Chart.register(ArcElement, Tooltip, Legend, CategoryScale)

const PieChart = () => {
  const [chartData, setChartData] = useState([{ datasets: [] }])
  const { isLoading, data, error } = useQuery('pieChartData', () => axios.get('projects/all'), {
    onSuccess: () => {
      setChartData(data?.data)
    },
    onError: async error => {
      console.log(error)
    },
    refetchOnWindowFocus: false,
  })

  //get unique status from data
  const uniqueStatus = [...new Set(data?.data.map(item => item.status))]
  //get unique status count from data
  const uniqueStatusCount = uniqueStatus.map(status => {
    return data?.data.filter(item => item.status === status).length
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

  return <Pie data={datas} />
}

export default PieChart
