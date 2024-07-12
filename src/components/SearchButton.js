// SearchButton.js
import React from 'react';

const SearchButton = ({ onClick }) => {
  return (
    <button className="search-button" onClick={onClick}>
      Buscar
    </button>
  );
};

export default SearchButton;
