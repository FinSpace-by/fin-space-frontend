import React, { useState } from 'react';
import './sass/index.scss';
import { Typography } from '@mui/material';

function Cards() {
  const [isLoading, setIsLoading] = useState(false);
  const totalBalance = '10 364.32';

  return (
    <div className="cards__container">
      <div className="header-container">
        <Typography variant="h6" className="page-title">
          Главная
        </Typography>

        <div className="balance">
          <Typography variant="body1" className="balance-label">
            Общий баланс
          </Typography>
          <Typography variant="h4" className="balance-amount">
            {totalBalance}
          </Typography>
        </div>
      </div>

      <button className="add-expense-button">
        + Добавить трату
      </button>
    </div>
  );
}

export default Cards;
