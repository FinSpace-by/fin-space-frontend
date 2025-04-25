import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import './sass/index.scss'

const GoogleButton = ({ onSuccess, onError, clientId }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className='google-auth-button'>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          render={({ onClick }) => (
            <button type='button' className='google-auth-button__custom' onClick={onClick}>
              <img
                src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                alt='Google'
                className='google-auth-button__custom__icon'
              />
            </button>
          )}
        />
      </div>
    </GoogleOAuthProvider>
  )
}

export default GoogleButton
