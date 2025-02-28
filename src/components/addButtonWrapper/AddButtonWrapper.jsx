import React from 'react';

import './sass/index.scss';

const AddButtonWrapper = ({ handleAdd }) => {
  return (
    <div className="button-wrapper">
      <div className="dark-overlay"></div>
      <button className="add-button" onClick={handleAdd}>Добавить</button>
    </div>
  );
};

export default AddButtonWrapper;
