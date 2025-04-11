import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

function Loader({ isLoading }) {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setIsShow(true)
    } else {
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
