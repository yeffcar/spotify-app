import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecentlyPlayed from './components/RecentlyPlayed';
import Queue from './components/Queue';
import CurrentlyPlaying from './components/CurrentlyPlaying';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';

const App = () => {
  const { accessToken, login } = useAuth();
  const [dynamicStyle, setDynamicStyle] = useState({
    logo: '',
    backgroundColor: '',
    textColor: ''
  });
  const [searchResults, setSearchResults] = useState([]);

  const SPOTIFY_CLIENT_ID = 'aa7d4420effd4f25b39c659124fa2c00';
  const SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-modify-playback-state'
  ].join(' ');

  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem('accessToken');

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
      window.location.hash = '';
      login(token);
      localStorage.setItem('accessToken', token);
    }
  }, [login]);

  useEffect(() => {
    fetchDynamicStyle();
  }, []);

  const fetchDynamicStyle = () => {
    fetch('https://cdn.integrations.habit.io/developers/sample/dynamic_layout.json')
      .then(response => response.json())
      .then(data => {
        setDynamicStyle({
          logo: data.logoUrl,
          backgroundColor: data.backgroundColor,
          textColor: data.textColor
        });
      })
      .catch(error => {
        console.error("Error fetching dynamic style: ", error);
      });
  };

  const handleUpdateStyle = () => {
    fetchDynamicStyle();
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="app">
      {dynamicStyle.logo && (
        <header className="app-header">
          <img src={dynamicStyle.logo} alt="logo" className="app-logo" />
          <button onClick={handleUpdateStyle} className="update-button">Actualizar Estilo</button>
        </header>
      )}
      {!accessToken ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}
          className="login-link"
        >
          Iniciar Sesión con Spotify
        </a>
      ) : (
        <>
          <SearchBar accessToken={accessToken} onSearchResults={handleSearchResults} />
          <div className="tracks-container">
            <RecentlyPlayed accessToken={accessToken} />
            <Queue accessToken={accessToken} />
            <CurrentlyPlaying accessToken={accessToken} />
          </div>
          {searchResults.length > 0 && (
            <div className="search-results">
              <h2>Resultados de Búsqueda</h2>
              <div className="track-list">
                {searchResults.map(track => (
                  <div key={track.id} className="track">
                    <img src={track.album.images[0].url} alt="Portada del Álbum" className="track-image"/>
                    <div className="track-name">{track.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const AppWithAuthProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuthProvider;
