import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({ categories }) => {
  const data = {
    labels: categories.map((category) => category.title),
    datasets: [
      {
        label: ' ',
        data: categories.map((category) => category.amount),
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderRadius: 10,
        hoverBackgroundColor: 'rgb(255, 255, 255)',
      },
    ],
  }

  const options = {
    responsive: false,
    barThickness: 40,
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          font: {
            family: 'SF Pro Text', 
            size: 18,
            weight: 600,
          },
          color: 'rgba(255, 255, 255, 0.7)', 
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: '',
      },
      tooltip: {
        multiKeyBackground: 'rgba(0, 0, 0, 0)',
        titleFont: {
          family: 'SF Pro Text',
          size: 12,
          color: 'rgba(255, 255, 255, 0.7)',
        },
        bodyFont: {
          family: 'SF Pro Text',
          size: 12,
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  }

  return <Bar data={data} options={options} width={370} height={190} />
}

export default BarChart
