import { height } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
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
  const [chartData, setChartData] = useState({ datasets: [] })

  const [chartOptions, setChartOptions] = useState({})

  const [numberOfDoc, setNumberOfDoc] = useState([])
  const [month, setMonth] = useState([])

  const { isLoading, data, error } = useQuery(
    'lineChartData',
    () =>
      axios.get('projects/month', {
        onSuccess: () => {
          console.log(data)
        },
        onError: async error => {
          console.log(error)
        },
      }),
    { refetchOnWindowFocus: false },
  )

  const val = data => {
    setNumberOfDoc([])
    setMonth([])
    if (data) {
      data.map(val => {
        if (val.numberofdocuments) {
          numberOfDoc.push(val.numberofdocuments)
          month.push(val.month)
        }
      })
    }

    console.log(numberOfDoc)

    console.log(month)
  }

  useEffect(() => {
    if (data) {
      val(data?.data)
    }
  }, [data])

  useEffect(() => {
    setChartData({
      labels: month,
      datasets: [
        {
          label: 'Number of projects by date',
          data: numberOfDoc,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    })
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: { display: true, text: 'yes' },
      },
    })
  }, [data])
  return (
    <div>
      <Line options={chartOptions} data={chartData} />
    </div>
  )
}

export default LineChart
