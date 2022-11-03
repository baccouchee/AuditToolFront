import { height } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const StatClient = () => {
  const [chartData, setChartData] = useState({ datasets: [] })

  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    setChartData({
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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
  }, [])
  return (
    <div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  )
}

export default StatClient
