import React, { useState } from 'react';
import './sass/index.scss';
import { Typography } from '@mui/material';

function Cards() {
  const [activeCard, setActiveCard] = useState(null);

  const handleClick = (index) => {
    setActiveCard(index);
  };

  const cardData = [
    { id: 1, bank: 'Альфа-Банк', number: '4255 19** **** 3212' },
    { id: 2, bank: 'Беларусбанк', number: '4255 19** **** 3124' },
    { id: 3, bank: 'Белагропромбанк', number: '4255 19** **** 1253' },
    { id: 4, bank: 'Паритетбанк', number: '4255 19** **** 5216' },
  ];

  return (
    <div className="cards__container">
      {cardData.map((card, index) => (
        <div
          key={card.id}
          className={`cards__card ${activeCard === index ? 'active' : ''}`}
          onClick={() => handleClick(index)}
          style={{
            zIndex:
              activeCard === index ? cardData.length : cardData.length - index,
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
        </div>
      ))}
    </div>
  );
}

export default Cards;
