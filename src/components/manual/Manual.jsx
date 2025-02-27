import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Tabs, Tab, TextField, Button } from '@mui/material';
import add_expenses from '@assets/icons/add_expenses.svg'
import add_income from '@assets/icons/add_income.svg'
import './sass/index.scss';

const PREVIOUS = -1;

const CATEGORIES = [
  {
    icon: add_expenses,
    title: 'Добавить расход',
  },
  {
    icon: add_income,
    title: 'Добавить доход',
  },
];

function Manual() {
  const navigate = useNavigate();

  const handleArrow = () => {
    navigate(PREVIOUS);
  };

  return (
    <div className="analitic__tabs__container">
  <div className="analitic__tabs__header">
    <Typography variant="h5" align="center" mb={3} fontSize={20}>Добавить вручную</Typography>
    <button className="arrow" onClick={handleArrow}></button>
  </div>

  <div className="analitic__tabContent">
    <div className="analitic__tabContent__header">
      <Typography variant="h5" fontSize={17}>Выберите тип</Typography>
    </div>
    {CATEGORIES.map((category, index) => (
      <div key={index} className="analitic__tab__category">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Typography variant="category" style={{ marginTop: 0, height: 45 }}>
            <img src={category.icon} />
          </Typography>
          <Typography variant="category" style={{ fontSize: 16, marginTop: 0 }}>
            {category.title}
          </Typography>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}

export default Manual;
