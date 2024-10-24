import React, { useState } from 'react';
import { Typography } from '@mui/material';
import memberIMG from '@assets/imgs/member.png';

import './sass/index.scss';

const membersData = [
  {
    id: 1,
    name: 'Я',
    history: [
      {
        id: 1,
        date: '29.11.2024',
        time: '13:00:23',
        place: 'Алми',
        card: '*1052',
        sum: '100',
      },
      {
        id: 2,
        date: '29.11.2024',
        time: '13:00:45',
        place: 'OZON',
        card: '*1052',
        sum: '100',
      },
      {
        id: 3,
        date: '30.11.2024',
        time: '13:00:23',
        place: 'Евроопт',
        card: '*1052',
        sum: '100',
      },
      {
        id: 4,
        date: '30.11.2024',
        time: '13:00:45',
        place: 'Соседи',
        card: '*1052',
        sum: '100',
      },
      {
        id: 5,
        date: '31.11.2024',
        time: '13:00:23',
        place: 'Wildberries',
        card: '*1052',
        sum: '100',
      },
      {
        id: 6,
        date: '31.11.2024',
        time: '13:00:45',
        place: 'iStore',
        card: '*1052',
        sum: '100',
      },
    ],
  },
  {
    id: 2,
    name: 'Жена',
    history: [
      {
        id: 1,
        date: '29.11.2024',
        time: '13:00:53',
        place: 'Золотое Яблоко',
        card: '*1052',
        sum: '100',
      },
      {
        id: 2,
        date: '29.09.2024',
        time: '13:00:23',
        place: 'Wildberries',
        card: '*1052',
        sum: '100',
      },
    ],
  },
  {
    id: 3,
    name: 'Дочь',
    history: [
      {
        id: 1,
        date: '29.11.2024',
        time: '13:00:10',
        place: 'Парк аттракционов',
        card: '*1052',
        sum: '100',
      },
      {
        id: 2,
        date: '30.11.2024',
        time: '13:00:45',
        place: 'Соседи',
        card: '*1052',
        sum: '100',
      },
    ],
  },
  {
    id: 4,
    name: 'Сын',
    history: [
      {
        id: 1,
        date: '29.11.2024',
        time: '13:00:10',
        place: 'Автозапчасти',
        card: '*1052',
        sum: '100',
      },
      {
        id: 2,
        date: '30.11.2024',
        time: '13:00:45',
        place: 'Барбершоп',
        card: '*1052',
        sum: '100',
      },
    ],
  },
];

function Family() {
  const [openMemberId, setOpenMemberId] = useState(null);
  const handleViewClick = (id) => {
    setOpenMemberId(openMemberId === id ? null : id);
  };

  return (
    <>
      <div className="family__container">
        {membersData.map((member) => {
          let lastDate = '';
          const isOpen = openMemberId === member.id;

          return (
            <div
              key={member.id}
              className="family__member__longContainer"
              style={{
                maxHeight: isOpen ? '400px' : '80px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
            >
              <div className="family__member__shortContainer">
                <div className="family__member__name">
                  <Typography variant="h5">{member.name}</Typography>
                </div>
                <img
                  src={memberIMG}
                  className="family__member__img"
                  alt="member"
                />
                <div
                  className="family__member__viewcont"
                  onClick={() => handleViewClick(member.id)}
                >
                  <Typography variant="bankName">Просмотр</Typography>
                </div>
              </div>

              <div className="family__history__container">
                {member.history.map((item) => {
                  const showDate = lastDate !== item.date;
                  lastDate = item.date;

                  return (
                    <div key={item.id} className="family__history__item">
                      {showDate && (
                        <Typography variant="date">{item.date}</Typography>
                      )}
                      <div className="family__history__item__pay">
                        <div className="family__history__item__pay__name">
                          <Typography variant="place">{item.place}</Typography>
                          <Typography variant="time">{item.card}</Typography>
                        </div>
                        <div className="family__history__item__pay__cost">
                          <Typography variant="place">
                            -{item.sum} BYN
                          </Typography>
                          <Typography variant="time">{item.time}</Typography>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="family__add-card-button">
        <Typography variant="plus">+</Typography>
      </div>
    </>
  );
}

export default Family;
