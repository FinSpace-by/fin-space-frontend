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
    </>
  );
}

export default Profile;
