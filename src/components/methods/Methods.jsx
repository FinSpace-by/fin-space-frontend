import React, { useState } from 'react';
import './sass/index.scss'; 

const Methods = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={handleClose}></button>
        <div className="grid">
          <div className="card">
            <div className="card__icon"></div>
            <p className="card__title">Вручную</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methods;
