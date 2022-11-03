import { height } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useQuery } from 'react-query'
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = () => {
  const [chartData, setChartData] = useState({ datasets: [] })

  const [numberOfDoc, setNumberOfDoc] = useState([])
  const [priority, setPriority] = useState([])

  const { isLoading, data, error } = useQuery(
    'pieChartData',
    () =>
      axios.get('workprograms/priority/charts', {
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
    setPriority([])
    if (data) {
      data.map(val => {
        if (val.numberofdocuments) {
          numberOfDoc.push(val.numberofdocuments)
          priority.push(val._id)
        }
      })
    }

    console.log(numberOfDoc)

    console.log(priority)
  }

  useEffect(() => {
    if (data) {
      val(data?.data)
    }
  }, [data])

  useEffect(() => {
    setChartData({
      labels: priority,
      datasets: [
        {
          label: '# of Votes',
          data: numberOfDoc,
          backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1,
          tension: 0.1,
        },
      ],
    })
  }, [data])
  return (
    <div>
      <Pie data={chartData} />
    </div>
  )
}

export default PieChart
