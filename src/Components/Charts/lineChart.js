import { height } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useQuery } from 'react-query'
import axios from 'axios'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const LineChart = () => {
  const [chartData, setChartData] = useState([])

  const { isLoading, data, error, isFetched, refetch } = useQuery('workprograms', () => axios.get('workprograms/all'), {
    onSuccess: () => {
      setChartData(data?.data)
    },
  })

  console.log('chartData', chartData)

  const uniqueStatus = [...new Set(data?.data.map(item => item.priority))]
  //get unique status count from data
  const uniqueStatusCount = uniqueStatus.map(priority => {
    return data?.data.filter(item => item.priority === priority).length
  })

  let datas = {
    labels: uniqueStatus ? uniqueStatus : [],
    datasets: [
      {
        label: 'Workprograms',
        data: uniqueStatusCount ? uniqueStatusCount : [],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div>
      <Bar
        data={datas}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  )
}

export default LineChart
