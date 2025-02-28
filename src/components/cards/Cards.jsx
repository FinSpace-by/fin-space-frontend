import React, { useState } from 'react';
import './sass/index.scss';
import { Typography } from '@mui/material';
import clsx from 'clsx';

const dates = {
  Пн: '06.12.2025',
  Вт: '07.12.2025',
  Ср: '08.12.2025',
  Чт: '09.12.2025',
  Пт: '10.12.2025',
  Сб: '11.12.2025',
  Вс: '12.12.2025',
};

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function Cards() {
  const [selectedDay, setSelectedDay] = useState('Вс');
  const [selectedDate, setSelectedDate] = useState(dates['Вс']);

  const handleDayClick = (day) => {
    setSelectedDay(day);
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
        <div className="expenses-income-sum1">
          <Typography className="page-title1">Расходы:</Typography>
          <Typography className="page-title2">1 249.99</Typography>
          <Typography className="page-title2 opacity">BYN</Typography>
        </div>
        <div className="expenses-income-sum2">
          <Typography className="page-title1">Доходы:</Typography>
          <Typography className="page-title3">1 249.99</Typography>
          <Typography className="page-title3 opacity">BYN</Typography>
        </div>
      </div>

      <div className='graphic-name-container'>
        <Typography className="page-title1">Аналитика расходов</Typography>
        <Typography className="page-title2">{selectedDate} &#9660;</Typography>
      </div>

      <div className='analitic-graphic'>
        {daysOfWeek.map((day, index) => ( 
          <div
            key={day}
            className={clsx('day-column', { active: selectedDay === day })}
            style={{ height: `${[100, 70, 170, 120, 100, 140, 80][index]}px` }}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
