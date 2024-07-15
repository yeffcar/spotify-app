import React, { useState, useEffect } from 'react';
import { debounce } from '../utils/debounce';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const debouncedSearch = debounce(onSearch, 500);
    if (query) {
      debouncedSearch(query);
    }
  }, [query, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Track..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;

