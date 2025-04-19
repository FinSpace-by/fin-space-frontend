import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants'
import logo from '@assets/imgs/logo.png'
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material'
import { authApi, userApi } from '@api'
import { REACT_APP_GOOGLE_CLIENT_ID } from '@config'
import GoogleButton from '@components/googleButton/GoogleButton.jsx'

import './sass/index.scss'

function Authorization() {
  const [isLoading, setIsLoading] = useState(true)
  const [phoneOrEmail, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ phoneOrEmail: false, password: false })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const hasErrors = {
      phoneOrEmail: phoneOrEmail === '',
      password: password === '',
    }

    setErrors(hasErrors)

    if (!hasErrors.phoneOrEmail && !hasErrors.password) {
      try {
        const body = { phoneOrEmail, password }
        const response = await authApi.setLogin(body)

        if (response?.data?.token) {
          localStorage.setItem('token', response.data.token)
        }

        navigate(ROUTES.CARDS.PATH)
      } catch {
        setSnackbar({
          open: true,
          message: 'Неверный логин или пароль',
          severity: 'warning',
        })
      }
    } else {
      setSnackbar({
        open: true,
        message: 'Заполните все поля',
        severity: 'warning',
      })
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await authApi.googleLogin({
        token: credentialResponse.credential,
        timestamp: Date.now(),
      })

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        navigate(ROUTES.CARDS.PATH)
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message,
        severity: 'error',
      })
    }
  }

  const handleGoogleError = () => {
    setSnackbar({
      open: true,
      message: 'Не удалось войти через Google',
      severity: 'error',
    })
  }

  return (
    <Box className='authorization'>
      <div className='authorization__img-container'>
        <img src={logo} alt='Logo' className='authorization__img-container__img' />
      </div>

      <div className='authorization__text'>
        <Typography variant='h5'>
          Fin
          <br />
          Space
        </Typography>
      </div>

      <form className='authorization__form' onSubmit={handleSubmit}>
        <TextField
          placeholder='Почта'
          variant='outlined'
          fullWidth
          margin='normal'
          value={phoneOrEmail}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phoneOrEmail}
          helperText={errors.phoneOrEmail ? 'Это поле обязательно' : ''}
        />

        <TextField
          placeholder='Пароль'
          type='password'
          variant='outlined'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText={errors.password ? 'Это поле обязательно' : ''}
        />

        <GoogleButton
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          clientId={REACT_APP_GOOGLE_CLIENT_ID}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          className='authorization__form__button'
        >
          Войти
        </Button>
      </form>
      <div className='authorization__no-account'>
        <Typography variant='login_register' onClick={() => navigate(ROUTES.REGISTRATION.PATH)}>
          Нет аккаунта
        </Typography>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Authorization
