import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Tabs, Tab, TextField, Button } from '@mui/material';
import salary from '@assets/icons/Salary.svg';
import avans from '@assets/icons/Avans.svg';
import debt from '@assets/icons/Debt.svg';
import extra_income from '@assets/icons/Extra_income.svg';
import investment from '@assets/icons/Investment.svg';
import premiya from '@assets/icons/Premiya.svg';
import arrow from '@assets/icons/arrow.png';
import { ROUTES } from '@constants';

import './sass/index.scss';

const CATEGORIES = [
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

const TRANSACTIONS = [
  { id: 1, sum: '120.2', date: '10.12.2024' },
  { id: 2, sum: '60.43', date: '11.12.2024' },
  { id: 3, sum: '80.64', date: '12.12.2024' },
  { id: 4, sum: '15.23', date: '13.12.2024' },
  { id: 5, sum: '56.54', date: '14.12.2024' },
  { id: 6, sum: '90.99', date: '15.12.2024' },
  { id: 7, sum: '99.99', date: '16.12.2024' },
  { id: 8, sum: '132.99', date: '17.12.2024' },
  { id: 9, sum: '65.99', date: '18.12.2024' },
  { id: 10, sum: '98.99', date: '19.12.2024' },
  { id: 11, sum: '13.99', date: '20.12.2024' },
  { id: 12, sum: '54.99', date: '21.12.2024' },
  { id: 13, sum: '156.99', date: '22.12.2024' },
  { id: 14, sum: '143.99', date: '23.12.2024' },
];

const RESULTS = [
  {
    time: '13:00',
    date: '12.12.2025',
    name: 'ООО БелБайБумБах',
    currency: 'BYN',
    sum: '1 249.99',
    isPositive: false,
  },
  {
    time: '13:00',
    date: '12.12.2025',
    name: 'ООО БелБайБумБах',
    currency: 'BYN',
    sum: '1 249.99',
    isPositive: true,
  },
  {
    time: '13:00',
    date: '12.12.2025',
    name: 'ООО БелБайБумБах',
    currency: 'BYN',
    sum: '1 249.99',
    isPositive: false,
  },
  {
    time: '13:00',
    date: '12.12.2025',
    name: 'ООО БелБайБумБах',
    currency: 'BYN',
    sum: '1 249.99',
    isPositive: false,
  },
  {
    time: '13:00',
    date: '12.12.2025',
    name: 'ООО БелБайБумБах',
    currency: 'BYN',
    sum: '1 249.99',
    isPositive: false,
  },
  {
    time: '13:00',
    date: '12.12.2025',
    name: 'ООО БелБайБумБах',
    currency: 'BYN',
    sum: '1 249.99',
    isPositive: false,
  },
  {
    time: '13:00',
    date: '12.12.2025',
    name: 'ООО БелБайБумБах',
    currency: 'BYN',
    sum: '1 249.99',
    isPositive: false,
  },
];

function Income() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDate, setActiveDate] = useState('');
  const [activeSum, setActiveSum] = useState(null);
  const [transactions, setTransactions] = useState([TRANSACTIONS]);
  const [categories, setCategories] = useState(CATEGORIES);
  const [limits, setLimits] = useState(categoryLimits);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setActiveSum(transactions[4].sum);
      setActiveDate(transactions[4].date);
    } catch {}
  }, [transactions]);

  const categoryLimits = categories.reduce((acc, category) => {
    acc[category.id] = category.limit;
    return acc;
  }, {});

  const handleRedirect = () => {
    navigate(ROUTES.CARDS.PATH);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCardChange = (event, newValue) => {
    setActiveCard(newValue);
  };

  const handleOpenCategory = () => {
    setIsOpenCategory(true);
  };

  const handleCloseCategory = () => {
    setIsOpenCategory(false);
  };

  const totalSpent = (categories) =>
    categories.reduce((total, category) => total + category.spent, 0);

  const minSum = Math.min(...transactions.map((t) => t.sum));
  const maxSum = Math.max(...transactions.map((t) => t.sum));

  const calculateHeight = (sum) => {
    const percentage = ((sum - minSum) / (maxSum - minSum)) * 100;
    return Math.max(percentage, 10);
  };

  const handleItemClick = (sum, date) => {
    setActiveSum(sum);
    setActiveDate(date);
  };

  const handleLimitChange = (categoryId, newLimit) => {
    setLimits((prevLimits) => ({
      ...prevLimits,
      [categoryId]: newLimit,
    }));
  };

  const handleSubmit = async () => {
    // try {
    //   await axios.post('/api/limits', { limits });
    //   alert('Лимиты успешно отправлены');
    // } catch (error) {
    //   console.error('Ошибка при отправке лимитов:', error);
    //   alert('Ошибка при отправке лимитов');
    // }
  };

  return (
    <>
      {!isOpenCategory ? (
        <>
          <div className="analitic__tabs__container">  
            <div className="analitic__tabs__header">
              <Typography variant="h5" align="center" mb={3} fontSize={17}>Категории доходов</Typography>
                <button className="cross" onClick={handleRedirect}></button>
            </div>
              <div className="analitic__tabContent">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="analitic__tab__category"
                    onClick={handleOpenCategory}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                    >
                      <Typography
                        variant="category"
                        style={{ marginTop: 0, height: 45 }}
                      >
                        <img src={category.icon} />
                      </Typography>
                      <Typography
                        variant="category"
                        style={{ fontSize: 16, marginTop: 0 }}
                      >
                        {category.title}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end',
                      }}
                    >
                      <span style={{ color: 'gray', fontSize: 17 }}>BYN</span>
                      <Typography
                        variant="category"
                        style={{ marginTop: 0, fontSize: 18 }}
                      >
                        1 249.99
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
          </div>
          {' '}
        </>
      ) : (
        <div className="category">
          <div className="category_titleWrapper">
            <img
              src={arrow}
              className="category_arrow"
              onClick={handleCloseCategory}
            />
            <div className="category_title">Еда</div>
          </div>
          <div className="category_body">
            {RESULTS.map((item) => {
              const { currency, date, isPositive, name, sum, time } = item;

              return (
                <div className="category_item">
                  <div>
                    <div className="category_date">
                      {time}, {date}
                    </div>
                    <div className="category_name">{name}</div>
                  </div>
                  <div className="category_finance">
                    <div className="category_currency">{currency}</div>
                    <div
                        className={clsx(
                          isPositive ? 'category_positive' : 'category_negative',
                          'category_sum'
                        )}
                      >
                        {isPositive ? '+' : '-'} {sum}
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Income;
