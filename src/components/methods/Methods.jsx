import React, { useState } from 'react';
import './sass/index.scss'; 
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants';
import Manual from '@components/manual/Manual';

const Methods = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleRedirect = () => {
    navigate(ROUTES.MANUAL.PATH);
    onClose();
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={handleClose}></button>
        <div className="grid">
          <div className="card" onClick={handleRedirect}>
            <div className="card__icon"></div>
            <p className="card__title">Вручную</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methods;
