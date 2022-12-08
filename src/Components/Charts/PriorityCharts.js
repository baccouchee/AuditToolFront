import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { CategoryScale, ArcElement, Tooltip, Legend } from 'chart.js'
import { Line, Pie, Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import moment from 'moment'
const PriorityCharts = () => {
  const [data, setData] = useState([])
  const [labels, setLabels] = useState([])

  const {
    isLoading,
    error,
    data: chartData,
  } = useQuery('chartData', () => axios.get('http://localhost:3000/projects/all'), {
    onSuccess: data => {
      setData(data.data)
    },
  })

  let dataset = []
  // get all project status by date and count them

  let clientLabels = []
  let clientData = []

  // collect all dates in an array
  data.map(project => {
    clientLabels.push(moment(project.createdAt).format('DD-MM-YYYY'))
  })

  // remove duplicates
  clientLabels = [...new Set(clientLabels)]
  console.log(clientLabels)

  // count the number of projects for each date
  clientLabels.map(label => {
    let count = 0
    data.map(project => {
      if (moment(project.createdAt).format('DD-MM-YYYY') === label) {
        count++
      }
    })
    clientData.push(count)
  })

  let datas = {
    labels: clientLabels ? clientLabels : [],
    datasets: [
      {
        label: 'Projects',
        data: clientData,
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  }

  console.log(datas)
  console.log('data', data)
  return (
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
  )
}

export default PriorityCharts
