import React, { useEffect, useState } from 'react'
import coin_loader from '@assets/imgs/coin_loader.gif'
import './sass/index.scss'

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
      <img src={coin_loader} className='loader-gif' />
    </div>
  )
}

export default Loader
