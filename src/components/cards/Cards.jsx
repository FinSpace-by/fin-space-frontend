import React, { useState } from 'react';
import './sass/index.scss';
import {
  Typography,
  CircularProgress,
  Button,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

function Cards() {
  const [activeCard, setActiveCard] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fromCard, setFromCard] = useState('');
  const [toCard, setToCard] = useState('');
  const [amount, setAmount] = useState('');

  const handleClick = (index) => {
    setActiveCard(index);
  };

  const cardData = [
    {
      id: 1,
      bank: 'Альфа-Банк',
      number: '4255 19** **** 3212',
      expiration_date: '06/25',
    },
    {
      id: 2,
      bank: 'Беларусбанк',
      number: '4255 19** **** 3124',
      expiration_date: '06/25',
    },
    {
      id: 3,
      bank: 'Белагропромбанк',
      number: '4255 19** **** 1253',
      expiration_date: '06/25',
    },
    {
      id: 4,
      bank: 'Паритетбанк',
      number: '4255 19** **** 5216',
      expiration_date: '06/25',
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="cards__container">
            {cardData.map((card, index) => (
              <div
                key={card.id}
                className={`cards__card ${activeCard === index ? 'active' : ''}`}
                onClick={() => handleClick(index)}
                style={{
                  zIndex: cardData.length - index,
                  transform:
                    activeCard === index
                      ? `translateY(calc(-100vh + 50px + 62.66vw + 25.06px))`
                      : `translateY(${-index * 40}px)`,
                }}
              >
                <Typography variant="cardText">BYN</Typography>
                <Typography variant="bankName" className="cards__card__bank">
                  {card.bank}
                </Typography>
                <br />
                <Typography className="cards__card__number" variant="cardText">
                  {card.number}
                </Typography>
                <Typography
                  className="cards__card__expiration"
                  variant="cardText"
                >
                  {card.expiration_date}
                </Typography>
              </div>
            ))}
          </div>
          <div className="cards__add-card-button">
            <Typography variant="plus">+</Typography>
          </div>

          <div
            className="cards__planning__button"
            style={{
              height: isOpen ? '70vh' : '55px',
              borderRadius: isOpen ? '15px' : '15vw',
            }}
          >
            <Typography
              variant="h5"
              className="cards__planning__button__text"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? `Перевод ▼` : `Перевод ▲`}
            </Typography>

            <div class="cards__planning__container">
              <Typography variant="category">С карты</Typography>
              <Select
                value={fromCard}
                onChange={(e) => setFromCard(e.target.value)}
                className="cards__planning__select"
              >
                {cardData.map((card) => (
                  <MenuItem key={card.id} value={card.id}>
                    {card.bank} | {card.number}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="category">На карту</Typography>
              <Select
                value={toCard}
                onChange={(e) => setToCard(e.target.value)}
                className="cards__planning__select"
              >
                {cardData.map((card) => (
                  <MenuItem key={card.id} value={card.id}>
                    {card.bank} | {card.number}
                  </MenuItem>
                ))}
              </Select>

              <Typography variant="category">Сумма</Typography>
              <div className="cards__planning__flexbox">
                <TextField
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="cards__planning__amount-input"
                />
                <Typography variant="category">BYN</Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsOpen(false)}
                className="cards__planning__submit-button"
              >
                Перевести
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cards;
