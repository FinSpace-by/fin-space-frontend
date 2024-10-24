import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Tab, TextField, Button } from '@mui/material';

import './sass/index.scss';

function Analitic() {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDate, setActiveDate] = useState('');
  const [activeSum, setActiveSum] = useState(null);
  const [transactions, setTransactions] = useState([
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
  ]);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Одежда', spent: 120, limit: 300 },
    { id: 2, name: 'Еда', spent: 50, limit: 300 },
    { id: 3, name: 'Жильё', spent: 500, limit: 500 },
    { id: 4, name: 'Транспорт', spent: 120, limit: 150 },
    { id: 5, name: 'Налоги', spent: 80, limit: 95 },
    { id: 6, name: 'Здоровье', spent: 8, limit: 100 },
    { id: 7, name: 'Развлечения', spent: 300, limit: 700 },
  ]);
  const [limits, setLimits] = useState(
    categories.reduce((acc, category) => {
      acc[category.id] = category.limit;
      return acc;
    }, {})
  );

  useEffect(() => {
    try {
      setActiveSum(transactions[4].sum);
      setActiveDate(transactions[4].date);
    } catch {}
  }, [transactions]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
      <div className="analitic__container">
        <Typography variant="bankName" className="analitic__cardName">
          Общая
        </Typography>
        <div className="analitic__container__place">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`analitic__container__item ${activeSum === transaction.sum ? 'active' : ''}`}
              style={{ height: `${calculateHeight(transaction.sum)}%` }}
              onClick={() => handleItemClick(transaction.sum, transaction.date)}
            ></div>
          ))}
        </div>
        <div className="analitic__container__sum">
          <Typography variant="graphic">{activeDate || ''}</Typography>
          <Typography variant="graphic">
            {activeSum !== null ? `-${activeSum} BYN` : ''}
          </Typography>
        </div>
      </div>
      <div className="analitic__tabs__container">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="analitic tabs"
        >
          <Tab label="Категории" className="analitic__tab1" />
          <Tab label="Рекомендации" className="analitic__tab2" />
        </Tabs>
        {activeTab === 0 && (
          <div className="analitic__tabContent">
            <div className="analitic__tab__category">
              <Typography variant="categoryAll">Все</Typography>
              <Typography variant="categoryAll">
                {totalSpent(categories)} BYN
              </Typography>
            </div>
            {categories.map((category, index) => (
              <div key={index} className="analitic__tab__category">
                <Typography variant="category">{category.name}</Typography>
                <Typography variant="category">
                  {category.spent}/{category.limit} BYN
                </Typography>
              </div>
            ))}
          </div>
        )}
        {activeTab === 1 && (
          <div className="analitic__tabContent">
            <Typography variant="category">
              Внимание! Рекомендации сгенерированы искусственым интеллектом и
              могут содержать ошибки. Обязательно перепроверяйте важную
              информацию.
              <br />
              <br />
              1. Лимиты по категориям расходов: <br />- Одежда и еда имеют
              одинаковые лимиты (300 BYN), что может быть чрезмерно высоким для
              категории "Одежда". Возможно, есть возможность снизить этот лимит
              в пользу других, более приоритетных расходов, таких как здоровье
              или сбережения. <br />- Развлечения также имеют высокий лимит (700
              BYN), что почти в два раза превышает расходы на жильё. Такой
              приоритет может негативно сказаться на долгосрочных целях.
              Возможно, стоит пересмотреть и уменьшить эту статью. <br />
              <br />
              2. Соотношение доходов и расходов:
              <br />- При ежемесячном доходе в 2000 BYN, твои лимиты на расходы
              составляют 2145 BYN. Это превышает доход, что может привести к
              дефициту бюджета или необходимости пользоваться кредитными
              средствами. Очень важно избегать превышения доходов, чтобы не
              попасть в долговую яму. <br />- Если ты уже не превышаешь лимиты
              или можешь найти возможность для экономии, обязательно создавай
              сбережения (рекомендуется откладывать хотя бы 10% от дохода).{' '}
              <br />
              <br />
              3. Налоги и здоровье:
              <br />- Лимиты на налоги и здоровье (95 BYN и 100 BYN
              соответственно) кажутся низкими по сравнению с такими категориями,
              как одежда или развлечения. Возможно, следует увеличить эти
              лимиты, так как эти категории являются обязательными расходами и
              могут непредвиденно увеличиться. <br />
              <br />
              4. Планирование расходов на месяц: <br />- Транзакции показывают
              активные расходы на протяжении второй половины месяца, но не
              указано, были ли учтены регулярные платежи (например, аренда
              жилья). Возможно, стоит начать планировать регулярные обязательные
              расходы в начале месяца. <br />
              <br />
              Рекомендации: <br />- Установи чёткие приоритеты в расходах:
              увеличь лимиты на жильё, здоровье и налоги, а также пересмотри
              траты на одежду и развлечения. <br />- Постарайся контролировать
              ежемесячные расходы так, чтобы они всегда были ниже дохода.
              Возможно, стоит начать откладывать на сбережения. <br />- Следи за
              регулярными платежами и старайся их оплачивать в начале месяца,
              чтобы избежать дефицита к его концу.
            </Typography>
          </div>
        )}
      </div>
      <div
        className="analitic__planning__button"
        style={{
          height: isOpen ? '80vh' : '55px',
          borderRadius: isOpen ? '15px' : '15vw',
        }}
      >
        <Typography
          variant="h5"
          className="analitic__planning__button__text"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? `Планирование ▼` : `Планирование ▲`}
        </Typography>

        <div class="analitic__planning__container">
          <Typography variant="category" className="analitic__planning__limits">
            Лимиты
          </Typography>
          {categories.map((category, index) => (
            <div key={category.id} className="analitic__tab__category">
              <Typography variant="category">{category.name}</Typography>
              <div className="analitic__planning__flex">
                <TextField
                  type="number"
                  value={limits[category.id]}
                  onChange={(e) =>
                    handleLimitChange(category.id, e.target.value)
                  }
                  variant="outlined"
                  size="small"
                  className="analitic__planning__limit-input"
                />
                <Typography variant="category">BYN</Typography>
              </div>
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="analitic__planning__submit-button"
          >
            Сохранить
          </Button>
        </div>
      </div>
    </>
  );
}

export default Analitic;
