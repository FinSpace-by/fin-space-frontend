import { useNavigate } from 'react-router-dom'
import React from 'react'

import './sass/index.scss'

const BackButton = ({ onClick }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    onClick?.()
    navigate(-1)
  }

  return <button className='arrow' onClick={handleClick}></button>
}

export default BackButton
