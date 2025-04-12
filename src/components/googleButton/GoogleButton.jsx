import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

import './sass/index.scss'

const GoogleButton = ({ onSuccess, onError, clientId }) => {
  const handleClick = () => {
    const googleButton = document.querySelector('.google-auth-button__hidden div[role=button]')
    if (googleButton) googleButton.click()
  }

  return (
    <div className='google-auth-button'>
      <button type='button' className='google-auth-button__custom' onClick={handleClick}>
        <img
          src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
          alt='Google'
          className='google-auth-button__custom__icon'
        />
        Войти через Google
      </button>

      <div className='google-auth-button__hidden'>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin onSuccess={onSuccess} onError={onError} />
        </GoogleOAuthProvider>
      </div>
    </div>
  )
}

export default GoogleButton
