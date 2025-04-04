import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants'
import logo from '@assets/imgs/logo.png'
import { authApi } from '@api'
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel, Link } from '@mui/material'
import './sass/index.scss'

function Registration() {
  const [phoneOrEmail, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreementChecked, setAgreementChecked] = useState(false)
  const [errors, setErrors] = useState({
    phoneOrEmail: false,
    password: false,
    confirmPassword: false,
    passwordMismatch: false,
    agreement: false,
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const passwordMismatch = password !== confirmPassword
    const hasErrors = {
      phoneOrEmail: phoneOrEmail === '',
      password: password === '',
      confirmPassword: confirmPassword === '',
      passwordMismatch,
      agreement: !agreementChecked,
    }

    setErrors(hasErrors)

    if (
      !hasErrors.phoneOrEmail &&
      !hasErrors.password &&
      !hasErrors.confirmPassword &&
      !passwordMismatch &&
      !hasErrors.agreement
    ) {
      const body = {
        phoneOrEmail: phoneOrEmail,
        password: password,
      }

      try {
        const response = await authApi.register(body)
        if (response?.data?.token) {
          localStorage.setItem('token', response.data.token)
        }
        navigate(ROUTES.CARDS.PATH)
      } catch (error) {
        console.error('Registration error:', error)
      }
    }
  }

  return (
    <Box className='registration'>
      <div className='registration__img-container'>
        <img src={logo} alt='Logo' className='registration__img-container__img' />
      </div>

      <div className='registration__text'>
        <Typography variant='h5'>
          Fin
          <br />
          Space
        </Typography>
      </div>

      <form className='registration__form' onSubmit={handleSubmit}>
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
          variant='outlined'
          type='password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText={errors.password ? 'Это поле обязательно' : ''}
        />

        <TextField
          placeholder='Повторите пароль'
          variant='outlined'
          type='password'
          fullWidth
          margin='normal'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword || errors.passwordMismatch}
          helperText={
            errors.confirmPassword
              ? 'Это поле обязательно'
              : errors.passwordMismatch
                ? 'Пароли не совпадают'
                : ''
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
              color='primary'
            />
          }
          label={
            <Typography variant='body2'>
              Принимаю политику в{' '}
              <Link
                href='https://docs.google.com/document/d/1Syy8HOm1B7J1JkabcZ6FSmGgh1Rd-tu5/edit?tab=t.0'
                target='_blank'
                rel='noopener noreferrer'
                underline='always'
              >
                обработке персональных данных
              </Link>
            </Typography>
          }
          sx={{ mt: 1, alignSelf: 'flex-start' }}
        />
        {errors.agreement && (
          <Typography color='error' variant='caption' sx={{ display: 'block', mt: -1, mb: 1 }}>
            Необходимо принять пользовательское соглашение
          </Typography>
        )}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          className='registration__form__button'
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className='registration__no-account'>
        <Typography variant='login_register' onClick={() => navigate(ROUTES.ROOT.PATH)}>
          Уже есть аккаунт? Войти
        </Typography>
      </div>
    </Box>
  )
}

export default Registration
