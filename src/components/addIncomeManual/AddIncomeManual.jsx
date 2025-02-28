import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ROUTES } from '@constants'
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper';
import salary from '@assets/icons/Salary.svg';
import avans from '@assets/icons/Avans.svg';
import debt from '@assets/icons/Debt.svg';
import extra_income from '@assets/icons/Extra_income.svg';
import investment from '@assets/icons/Investment.svg';
import premiya from '@assets/icons/Premiya.svg';
import add_custom from '@assets/icons/add_custom.svg'

import './sass/index.scss';

const CATEGORIES = [
    { 
      icon: add_custom,
      title: 'Добавить категорию',
    },
    {
      icon: salary,
      title: 'Зарплата',
    },
    {
      icon: avans,
      title: 'Аванс',
    },
    {
      icon: premiya,
      title: 'Премия',
    },
    {
      icon: extra_income,
      title: 'Дополнительный доход',
    },
    {
      icon: debt,
      title: 'Возврат долга',
    },
    {
      icon: investment,
      title: 'Инвестиции',
    },
    
  ];

function AddIncomeManual() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');

  const amountInputRef = useRef(null);

  const handleArrow = () => {
    navigate(-1);
  };

  const handleCategoryClick = (category) => {

    if (category.title === "Добавить категорию") {
      navigate(ROUTES.ADD_CUSTOM.PATH);
    }

    setSelectedCategory(category);

    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });

    setTimeout(() => {
      if (amountInputRef.current) {
        amountInputRef.current.focus();
      }
    }, 500);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAdd = () => {
    if (selectedCategory && amount) {
      setAmount('');
      setSelectedCategory(null);
    }
  };

  return (
    <div className="analitic__tabs__container">
      <div className="analitic__tabs__header">
        <Typography variant="h5" align="center" mb={3} fontSize={20}>Добавить доход</Typography>
        <button className="arrow" onClick={handleArrow}></button>
      </div>
      <div className="analitic__tabContent">
        <div className="analitic__tabContent__header">
          <Typography variant="h5" fontSize={17}>Сумма</Typography>
        </div>
        <div className="analitic__inputWrapper">
          <input
            type="text"
            placeholder="0"
            value={amount}
            onChange={handleAmountChange}
            ref={amountInputRef} 
          />
          <span className="currency">BYN</span>
        </div>
        <div className="analitic__tabContent__header">
          <Typography variant="h5" mt={2} fontSize={17}>Категория</Typography>
        </div>
          {CATEGORIES.map((category, index) => (
            <div
              key={index}
              className="analitic__tab__category"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="category-header">
                <Typography
                  variant="category"
                  className="category-icon"
                >
                  <img src={category.icon} alt="icon" />
                </Typography>
                <Typography variant="category" className="category-title">
                  {category.title}
                </Typography>
              </div>
            </div>
          ))}
      </div>
      <AddButtonWrapper handleAdd={handleAdd} />
    </div>
  );
}

export default AddIncomeManual;
