import React from 'react'

import './sass/index.scss'

const AddButtonWrapper = ({ onClick }) => {
  return (
    <div className='button-wrapper'>
      <div className='dark-overlay'></div>
      <button className='add-button' onClick={onClick}>
        Добавить
      </button>
    </div>
  )
}

export default AddButtonWrapper
