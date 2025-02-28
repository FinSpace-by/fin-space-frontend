import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants'
import logo from '@assets/imgs/logo.png'
import { authApi } from '@api'
import { TextField, Button, Box, Typography } from '@mui/material'
import './sass/index.scss'

function Registration() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errors, setErrors] = useState({
    phone: false,
    password: false,
    firstName: false,
    lastName: false,
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const hasErrors = {
      phone: phone === '',
      password: password === '',
      firstName: firstName === '',
      lastName: lastName === '',
    }

    setErrors(hasErrors)

    if (!hasErrors.phone && !hasErrors.password && !hasErrors.firstName && !hasErrors.lastName) {
      const body = {
        phone: phone,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }

      try {
        await authApi.register(body)
        navigate(ROUTES.CARDS.PATH)
      } catch (error) {}
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
          placeholder='Номер телефона'
          variant='outlined'
          fullWidth
          margin='normal'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          helperText={errors.phone ? 'Это поле обязательно' : ''}
        />

        <TextField
          placeholder='Имя'
          variant='outlined'
          fullWidth
          margin='normal'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName}
          helperText={errors.firstName ? 'Это поле обязательно' : ''}
        />

        <TextField
          placeholder='Фамилия'
          variant='outlined'
          fullWidth
          margin='normal'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName}
          helperText={errors.lastName ? 'Это поле обязательно' : ''}
        />

        <TextField
          placeholder='Пароль'
          variant='outlined'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText={errors.password ? 'Это поле обязательно' : ''}
        />

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
          Есть аккаунт
        </Typography>
      </div>
    </Box>
  )
}

export default Registration
