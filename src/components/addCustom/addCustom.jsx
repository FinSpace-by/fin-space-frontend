import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ROUTES } from '@constants'

import './sass/index.scss';

const PREVIOUS = -1;

function AddExpensesManual() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');

  const amountInputRef = useRef(null);

  const handleArrow = () => {
    navigate(PREVIOUS);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAdd = () => {
      setAmount('');
  };

  return (
    <div className="analitic__tabs__container">
      <div className="analitic__tabs__header">
        <Typography variant="h5" align="center" mb={3} fontSize={20}>Добавить вручную</Typography>
        <button className="arrow" onClick={handleArrow}></button>
      </div>
      <div className="analitic__tabContent">
        <div className="analitic__tabContent__header">
          <Typography variant="h5" fontSize={17}>Категория</Typography>
        </div>
        <div className="analitic__inputWrapper">
          <input
            type="text"
            placeholder="Введите название категории"
            value={amount}
            onChange={handleAmountChange}
            ref={amountInputRef} 
          />
        </div>
      </div>
      <div className="button-wrapper">
        <div className="dark-overlay"></div>
        <button className="add-button" onClick={handleAdd}>Добавить</button>
      </div>
    </div>
  );
}

export default AddExpensesManual;
