import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

import './sass/index.scss'

Chart.register(ArcElement, Tooltip, Legend)

const options = (amount) => ({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      titleFont: {
        family: '"SF Pro Text", normal',
        size: 14,
        weight: '600',
      },
      bodyFont: {
        family: '"SF Pro Text", normal',
        size: 14,
      },
      position: 'nearest',
      callbacks: {
        label: function (tooltipItem) {
          const value = tooltipItem.raw
          const percentage = ((value / amount) * 100).toFixed(2)
          return `${value.toFixed(2)} BYN (${percentage}%)`
        },
      },
    },
  },
  cutout: '56%',
})

const data = (categories) => ({
  labels: categories.map((cat) => cat.title),
  datasets: [
    {
      data: categories.map((cat) => parseFloat(cat.amount)),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      hoverBackgroundColor: [
        '#FF6384CC',
        '#36A2EBCC',
        '#FFCE56CC',
        '#4BC0C0CC',
        '#9966FFCC',
        '#FF9F40CC',
      ],
    },
  ],
})

const PieChart = ({ categories, amount }) => {
  return (
    <div className='pie-chart-wrapper'>
      <div className='pie-chart-circle'>
        <span>{amount} BYN</span>
      </div>
      <Pie data={data(categories)} options={options(amount)} />
    </div>
  )
}

export default PieChart
