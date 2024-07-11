import React, { useState } from 'react';

const SearchBar = ({ accessToken, onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query) return;

    const searchEndpoint = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    const response = await fetch(searchEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    onSearchResults(data.tracks.items);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Buscar pistas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Buscar</button>
    </form>
  );
};

export default SearchBar;
