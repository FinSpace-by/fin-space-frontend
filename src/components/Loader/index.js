import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import './sass/index.scss'

function Loader({ isLoading }) {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setIsShow(true) // Показываем сразу при загрузке
    } else {
      // Скрываем через 500мс после завершения загрузки
      const timer = setTimeout(() => setIsShow(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!isShow) return null

  return (
    <div className='loader-overlay'>
      <CircularProgress size={80} thickness={6} />
    </div>
  )
}

export default Loader
