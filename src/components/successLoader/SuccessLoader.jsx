import React, { useEffect, useState } from 'react'
import './sass/index.scss'

function SuccessLoader({ isSuccess }) {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setIsShow(true)
      const timer = setTimeout(() => setIsShow(false), 1500) // Автоматически скрываем через 2 секунды
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  if (!isShow) return null

  return (
    <div className='success-loader-body'>
      <div className='success-loader-container'>
        <div className='pencil'></div>
        <svg className='checkmark' width='130' height='120'>
          <line className='line1' x1='10' y1='40' x2='50' y2='80' />
          <line className='line2' x1='50' y1='80' x2='120' y2='10' />
        </svg>
      </div>
    </div>
  )
}

export default SuccessLoader
