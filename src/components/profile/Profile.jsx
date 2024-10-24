import React, { useState } from 'react';
import { Typography } from '@mui/material';
import member from '@assets/imgs/member.png';

import './sass/index.scss';

function Profile() {
  return (
    <>
      <img src={member} className="profile__img" />
      <div className="profile__user-name">
        <Typography variant="header">Иван Иванов</Typography>
      </div>

      <div className="profile__menu__container">
        <Typography variant="menu">Личная информация</Typography>
        <Typography variant="menu">Безопасность</Typography>
        <Typography variant="menu">Программы лояльности</Typography>
        <Typography variant="menu">Банки партнёры</Typography>
        <Typography variant="menu">Служба поддержки</Typography>
        <Typography variant="menu">Настройки</Typography>
        <Typography variant="menu">Выйти</Typography>
      </div>
    </>
  );
}

export default Profile;
