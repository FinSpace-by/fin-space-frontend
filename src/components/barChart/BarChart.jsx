import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const chartOptions = {
  responsive: false,
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        font: {
          family: 'SF Pro Text',
          size: 14,
          weight: 600,
        },
        color: 'rgba(255, 255, 255, 0.7)',
        maxRotation: 0,
        autoSkip: true,
      },
    },
    y: {
      grid: { display: false },
      ticks: { display: false },
    },
  },
  plugins: {
    legend: { display: false },
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

const LineChart = ({ categories, isExpenses }) => {
  const labels = categories.map((item) => item.title)
  const dataValues = categories.map((item) => item.amount)

  const pointRadii = dataValues.map((value) => (value > 0 ? 4 : 0))

  const lineColor = isExpenses ? '#ff6060' : '#15d638'

  const hasNonZero = dataValues.some((val) => val > 0)
  const maxY = hasNonZero ? Math.max(...dataValues) * 1.2 : 10

  const dynamicOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        min: 0,
        max: maxY,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'BYN',
        data: dataValues,
        borderColor: lineColor,
        backgroundColor: lineColor,
        tension: 0.4,
        fill: false,
        borderWidth: 6,
        pointRadius: pointRadii,
        pointHoverRadius: pointRadii.map((r) => (r > 0 ? 10 : 0)),
      },
    ],
  }

  return <Line data={data} options={dynamicOptions} width={370} height={190} />
}

export default LineChart
