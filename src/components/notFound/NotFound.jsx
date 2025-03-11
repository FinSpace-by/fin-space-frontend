import React from 'react'
import BackButton from '@components/backButton/BackButton'

import './sass/index.scss'

function NotFound() {
  return (
    <div className='notFound'>
      <BackButton />
      <div>Страница находится в разработке</div>
    </div>
  )
}

export default NotFound
