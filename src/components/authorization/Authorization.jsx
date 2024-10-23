import React, { useState } from 'react';
import logo from '@assets/imgs/logo.png';
import { TextField, Button, Box, Typography } from '@mui/material';

import './sass/index.scss';

function Authorization() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ phone: false, password: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка на обязательные поля
    const hasErrors = {
      phone: phone === '',
      password: password === '',
    };

    setErrors(hasErrors);

    if (!hasErrors.phone && !hasErrors.password) {
      console.log('Logged in:', { phone, password });
    }
  };

  return (
    <Box className="authorization">
      <div className="authorization__img-container">
        <img
          src={logo}
          alt="Logo"
          className="authorization__img-container__img"
        />
      </div>

      <div className="authorization__text">
        <Typography variant="h5">
          Белкарт
          <br />
          Space
        </Typography>
      </div>

      <form className="authorization__form" onSubmit={handleSubmit}>
        <TextField
          placeholder="Номер телефона"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          helperText={errors.phone ? 'Это поле обязательно' : ''}
        />

        <TextField
          placeholder="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText={errors.password ? 'Это поле обязательно' : ''}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="authorization__form__button"
        >
          Войти
        </Button>
      </form>
      <div className="authorization__no-account">
        <Typography variant="login_register">Нет аккаунта</Typography>
      </div>
    </Box>
  );
}

export default Authorization;
