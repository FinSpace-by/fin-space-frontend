import React, { useState } from 'react';
import './sass/index.scss';
import { Typography } from '@mui/material';

function Cards() {
  const [selectedDay, setSelectedDay] = useState('Вс');
  const [selectedDate, setSelectedDate] = useState('12.12.2025');

  const handleDayClick = (day) => {
    setSelectedDay(day);
    const dates = {
      Пн: '06.12.2025',
      Вт: '07.12.2025',
      Ср: '08.12.2025',
      Чт: '09.12.2025',
      Пт: '10.12.2025',
      Сб: '11.12.2025',
      Вс: '12.12.2025',
    };
    setSelectedDate(dates[day]);
  };

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
            10 364.32
          </Typography>
        </div>
      </div>

      <div className="expenses-income-sum">
        <div className="expenses-income-sum1" style={{ display: 'flex' }}>
          <Typography className="page-title1">Расходы:</Typography>
          <Typography className="page-title2">1 249.99</Typography>
          <Typography className="page-title2" style={{ opacity: 0.5 }}>BYN</Typography>
        </div>
        <div className="expenses-income-sum2" style={{ display: 'flex' }}>
          <Typography className="page-title1">Доходы:</Typography>
          <Typography className="page-title3">1 249.99</Typography>
          <Typography className="page-title3" style={{ opacity: 0.5 }}>BYN</Typography>
        </div>
      </div>

      <div className='graphic-name-container'>
        <Typography className="page-title1">Аналитика расходов</Typography>
        <Typography className="page-title2">{selectedDate} &#9660;</Typography>
      </div>

      <div className='analitic-graphic'>
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
          <div
            key={index}
            className={`day-column ${selectedDay === day ? 'active' : ''}`}
            style={{
              height: `${[100, 70, 170, 120, 100, 140, 80][index]}px`,
              cursor: 'pointer',
            }}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </div>
        ))}
      </div>

      <button className="add-expense-button">+ Добавить трату</button>
    </div>
  );
}

export default Cards;