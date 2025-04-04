import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import './sass/index.scss'

Chart.register(ArcElement, Tooltip, Legend)

const CATEGORY_COLORS = {
  'Платежи по кредиту': '#DEEB4F',
  Образование: '#8800FF',
  Еда: '#EBB24F',
  'Коммунальные платежи': '#699EFF',
  Транспорт: '#42E52F',
  Развлечения: '#E85F5F',
  Одежда: '#427AE2',
  Здоровье: '#E72828',
  Аванс: '#58B5F3',
  'Возврат долга': '#FC60A1',
  'Дополнительный доход': '#35FF53',
  Зарплата: '#48FF6A',
  Инвестиции: '#6FF7AC',
  Премия: '#F0D647',
}

const DEFAULT_COLORS = ['#88E67D']

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

const data = (categories) => {
  const backgroundColors = categories.map(
    (cat) =>
      CATEGORY_COLORS[cat.title] || DEFAULT_COLORS[categories.indexOf(cat) % DEFAULT_COLORS.length]
  )

  const hoverColors = backgroundColors.map((color) => `${color}50`)

  return {
    labels: categories.map((cat) => cat.title),
    datasets: [
      {
        data: categories.map((cat) => parseFloat(cat.amount)),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverColors,
      },
    ],
  }
}

const PieChart = ({ categories, amount }) => {
  return (
    <div className='pie-chart-wrapper'>
      <div className='pie-chart-circle'>
        <span>{amount.toFixed(2)} BYN</span>
      </div>
      <Pie data={data(categories)} options={options(amount)} />
    </div>
  )
}

export default PieChart
