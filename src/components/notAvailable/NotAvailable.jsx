import { Typography } from '@mui/material'
import React from 'react'

import './sass/index.scss'

function NotFound() {
  return (
    <div className='container'>
      <Typography variant='h5'>Приложение доступно только на iOS и Android</Typography>
    </div>
  )
}

export default NotFound
