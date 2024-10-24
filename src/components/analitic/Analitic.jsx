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
            <Typography variant="h5">Контент для общей аналитики</Typography>
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
    </>
  );
}

export default Analitic;
