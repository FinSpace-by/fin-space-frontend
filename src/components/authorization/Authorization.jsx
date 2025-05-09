import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '@constants'
import logo from '@assets/imgs/logo.png'
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { authApi, userApi, verificationApi } from '@api'
import { REACT_APP_GOOGLE_CLIENT_ID } from '@config'
import GoogleButton from '@components/googleButton/GoogleButton.jsx'

import './sass/index.scss'

function Authorization() {
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [phoneOrEmail, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({ phoneOrEmail: false, password: false })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  })
  const navigate = useNavigate()
  const demoAccounts = [
    { phoneOrEmail: '+375339999991', password: '1111' },
    { phoneOrEmail: '+375339999992', password: '2222' },
    { phoneOrEmail: '+375339999993', password: '3333' },
    { phoneOrEmail: '+375339999994', password: '4444' },
    { phoneOrEmail: '+375339999995', password: '5555' },
  ]

  useEffect(() => {
    const savedCredentials = localStorage.getItem('rememberedCredentials')
    if (savedCredentials) {
      try {
        const { phoneOrEmail: savedPhoneOrEmail, password: savedPassword } =
          JSON.parse(savedCredentials)
        setPhone(savedPhoneOrEmail)
        setPassword(savedPassword)
        setRememberMe(true)
      } catch (e) {
        console.error('Failed to parse saved credentials', e)
      }
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (searchParams.get('auto')) {
      const randomAccount = demoAccounts[Math.floor(Math.random() * demoAccounts.length)]

      authApi
        .setLogin({
          phoneOrEmail: randomAccount.phoneOrEmail,
          password: randomAccount.password,
        })
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          navigate(ROUTES.CARDS.PATH)
        })
    }
  }, [searchParams])

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

          if (rememberMe) {
            localStorage.setItem(
              'rememberedCredentials',
              JSON.stringify({ phoneOrEmail, password })
            )
          } else {
            localStorage.removeItem('rememberedCredentials')
          }

          navigate(ROUTES.CARDS.PATH)
        }
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

        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color='primary'
            />
          }
          label='Запомнить меня'
          sx={{ alignSelf: 'flex-start', mt: 1 }}
        />

        {/* <GoogleButton
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          clientId={REACT_APP_GOOGLE_CLIENT_ID}
        /> */}

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
