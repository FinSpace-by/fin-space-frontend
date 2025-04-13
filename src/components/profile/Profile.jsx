import React from 'react'
import { Typography, IconButton } from '@mui/material'
import { ICONS_MAP } from '@constants'

import './sass/index.scss'

function Profile() {
  const handleFeedbackClick = () => {
    const username = 'Yaroslay'
    window.open(`tg://resolve?domain=${username}`, '_blank')
  }

  return (
    <div className='profile'>
      <div className='profile__container'>
        <Typography variant='h5' className='header' align='center'>
          Настройки
        </Typography>
        <IconButton className='profile__item' onClick={handleFeedbackClick}>
          <img src={ICONS_MAP['feedback_icon']} className='profile__item__icon' />
          <Typography className='profile__item__text'>Обратная связь</Typography>
        </IconButton>
      </div>
    </div>
  )
}

export default Profile
