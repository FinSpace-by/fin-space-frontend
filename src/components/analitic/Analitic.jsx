import React, { useState } from 'react';
import { Typography, Tabs, Tab } from '@mui/material';

import './sass/index.scss';

function Analitic() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <div className="analitic__container">
        <Typography variant="bankName" className="analitic__cardName">
          Общая
        </Typography>
        <div className="analitic__container__place">
          <div className="analitic__container__graphic__item"></div>
          <div className="analitic__container__graphic__item analitic__container__graphic__item1"></div>
          <div className="analitic__container__graphic__item analitic__container__graphic__item2"></div>
          <div className="analitic__container__graphic__item analitic__container__graphic__item3"></div>
          <div className="analitic__container__graphic__item analitic__container__graphic__item4"></div>
          <div className="analitic__container__graphic__item analitic__container__graphic__item5"></div>
          <div className="analitic__container__graphic__item analitic__container__graphic__item6"></div>
        </div>
        <div className="analitic__container__sum">
          <Typography variant="graphic">22.10.2024</Typography>
          <Typography variant="graphic">-147.43 BYN</Typography>
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
              <Typography variant="categoryAll">1567 BYN</Typography>
            </div>
            <div className="analitic__tab__category">
              <Typography variant="category">Одежда</Typography>
              <Typography variant="category">120/300 BYN</Typography>
            </div>
            <div className="analitic__tab__category">
              <Typography variant="category">Еда</Typography>
              <Typography variant="category">50/300 BYN</Typography>
            </div>
            <div className="analitic__tab__category">
              <Typography variant="category">Жильё</Typography>
              <Typography variant="category">500/500 BYN</Typography>
            </div>
            <div className="analitic__tab__category">
              <Typography variant="category">Транспорт</Typography>
              <Typography variant="category">120/150 BYN</Typography>
            </div>
            <div className="analitic__tab__category">
              <Typography variant="category">Налоги</Typography>
              <Typography variant="category">80/95 BYN</Typography>
            </div>
            <div className="analitic__tab__category">
              <Typography variant="category">Здоровье</Typography>
              <Typography variant="category">8/100 BYN</Typography>
            </div>
            <div className="analitic__tab__category">
              <Typography variant="category">Развлечения</Typography>
              <Typography variant="category">300/700 BYN</Typography>
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="analitic__tabContent">
            <Typography variant="h5">
              Контент для подробной аналитики
            </Typography>
          </div>
        )}
      </div>
      <div className="analitic__planning__button">
        <Typography variant="h5">Планирование</Typography>
      </div>
    </>
  );
}

export default Analitic;
