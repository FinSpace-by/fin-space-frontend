import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ROUTES } from '@constants';
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper';

import './sass/index.scss';

function ScannerResults() {
  const navigate = useNavigate();

  // Захардкоженный список продуктов
  const [products, setProducts] = useState([
    { id: 1, name: 'Молоко', amount: '', category: 'Молочные продукты' },
    { id: 2, name: 'Хлеб', amount: '', category: 'Выпечка' },
    { id: 3, name: 'Яблоки', amount: '', category: 'Фрукты' },
  ]);

  // Обработчик изменения значения в инпутах
  const handleInputChange = (id, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleArrow = () => {
    navigate(-1);
  };

  const handleAdd = async () => {
    console.log('Отправка данных:', products);
    // Позже сюда добавим API-запрос
  };

  return (
    <div className="analitic__tabs__container">
      <div className="analitic__tabs__header">
        <Typography variant="h5" align="center" mb={3} fontSize={20}>
          Результаты сканирования
        </Typography>
        <button className="arrow" onClick={handleArrow}></button>
      </div>

      <div className="analitic__tabContent">
        {products.map((product) => (
          <div key={product.id} className="analitic__tabContent__block">
            <div className="analitic__tabContent__header">
              <Typography variant="h5" fontSize={17}>
                Название
              </Typography>
            </div>
            <div className="analitic__inputWrapper">
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleInputChange(product.id, 'name', e.target.value)}
              />
            </div>

            <div className="analitic__tabContent__header">
              <Typography variant="h5" fontSize={17}>
                Сумма
              </Typography>
            </div>
            <div className="analitic__inputWrapper">
              <input
                type="text"
                placeholder="0"
                value={product.amount}
                onChange={(e) => handleInputChange(product.id, 'amount', e.target.value)}
              />
              <span className="currency">BYN</span>
            </div>

            <div className="analitic__tabContent__header">
              <Typography variant="h5" mt={2} fontSize={17}>
                Категория
              </Typography>
            </div>
            <div className="analitic__inputWrapper">
              <input
                type="text"
                value={product.category}
                onChange={(e) => handleInputChange(product.id, 'category', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <AddButtonWrapper onClick={handleAdd} />
    </div>
  );
}

export default ScannerResults;
