import React, { useState } from 'react';
import { Typography } from '@mui/material';
import member from '@assets/imgs/member.png';

import './sass/index.scss';

function Family() {
  return (
    <div className="family__container">
      <div className="family__member__longContainer">
        <div className="family__member__shortContainer">
          <div className="family__member__name">
            <Typography variant="h5">Я</Typography>
          </div>
          <img src={member} className="family__member__img" />
          <div className="family__member__viewcont">
            <Typography variant="bankName">Просмотр</Typography>
          </div>
        </div>
        <Typography variant="h5">dsfasf</Typography>
      </div>

      <div className="family__member__longContainer">
        <div className="family__member__shortContainer">
          <div className="family__member__name">
            <Typography variant="h5">Жена</Typography>
          </div>
          <img src={member} className="family__member__img" />
          <div className="family__member__viewcont">
            <Typography variant="bankName">Просмотр</Typography>
          </div>
        </div>
      </div>

      <div className="family__member__longContainer">
        <div className="family__member__shortContainer">
          <div className="family__member__name">
            <Typography variant="h5">Дочка</Typography>
          </div>
          <img src={member} className="family__member__img" />
          <div className="family__member__viewcont">
            <Typography variant="bankName">Просмотр</Typography>
          </div>
        </div>
      </div>

      <div className="family__member__longContainer">
        <div className="family__member__shortContainer">
          <div className="family__member__name">
            <Typography variant="h5">Тёща</Typography>
          </div>
          <img src={member} className="family__member__img" />
          <div className="family__member__viewcont">
            <Typography variant="bankName">Просмотр</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Family;
