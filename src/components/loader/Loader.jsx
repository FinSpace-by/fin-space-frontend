import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import './sass/index.scss'

function Loader({ loading }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (loading) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 500)

      return () => {
        clearTimeout(timer)
      }
    } else {
      const hideTimer = setTimeout(() => {
        setShow(false)
      }, 500)

      return () => clearTimeout(hideTimer)
    }
  }, [loading])

  if (!show) return null

  return (
    <div className='loader-overlay'>
      <CircularProgress size={80} thickness={6} />
      <div></div>
    </div>
  )
}

export default Loader
