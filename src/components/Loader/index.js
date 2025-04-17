import React, { useEffect, useState } from 'react'

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
      <div className='animation'>
        <div className='coin'></div>
        <div className='finger'></div>
        <div className='hand'>
          <div className='hand1'></div>
          <div className='hand2'></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
