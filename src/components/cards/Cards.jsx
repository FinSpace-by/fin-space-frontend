import React, { useState } from 'react';
import './sass/index.scss';
import { Typography } from '@mui/material';

function Cards() {
  const [activeCard, setActiveCard] = useState(0);

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
      <div className="cards__container">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            className={`cards__card ${activeCard === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
            style={{
              zIndex:
                activeCard === index
                  ? cardData.length
                  : cardData.length - index,
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
            <Typography className="cards__card__expiration" variant="cardText">
              {card.expiration_date}
            </Typography>
          </div>
        ))}
      </div>
      <div className="cards__add-card-button">
        <Typography variant="plus">+</Typography>
      </div>
    </>
  );
}

export default Cards;
