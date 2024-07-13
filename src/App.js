// App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TrackList from './components/TrackList';
import CurrentTrack from './components/CurrentTrack';
import RecentlyPlayed from './components/RecentlyPlayed';
import QueuePlayer from './components/QueuePlayer'; // Importa el nuevo componente QueuePlayer
import useSpotifyToken from './hooks/useSpotifyToken';
import useCurrentTrack from './hooks/useCurrentTrack';
import { AUTH_ENDPOINT, SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, RESPONSE_TYPE, SCOPES } from './Config';
import './App.css';

const App = () => {
  const accessToken = useSpotifyToken();
  const currentTrack = useCurrentTrack(accessToken);
  const [dynamicStyle, setDynamicStyle] = useState({
    logo: '',
    backgroundColor: '',
    textColor: ''
  });
  const [tracks, setTracks] = useState([]);

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
        console.error('Error fetching dynamic style: ', error);
      });
  };

  const handleUpdateStyle = () => {
    fetchDynamicStyle();
  };

  const handleSearch = (query) => {
    // Realizar la búsqueda en la API de Spotify
    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Actualizar el estado de tracks con los resultados de la búsqueda
        setTracks(data.tracks.items);
      })
      .catch(error => {
        console.error('Error searching tracks: ', error);
      });
  };

  const handleLogout = () => {
    // Eliminar token y datos de sesión
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expiry_time');
    
    // Redirigir al usuario a la página de inicio de sesión de Spotify
    const logoutUrl = `${AUTH_ENDPOINT}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.replace(logoutUrl);
  };

  return (
    <div className="app" style={{ backgroundColor: dynamicStyle.backgroundColor, color: dynamicStyle.textColor }}>
      <Header 
        logoUrl={dynamicStyle.logo}
        onUpdateStyle={handleUpdateStyle}
        onLogout={handleLogout}
        isAuthenticated={!!accessToken}
        accessToken={accessToken}
        onSearch={handleSearch}
      />
      {accessToken && (
        <>
          {currentTrack && <CurrentTrack track={currentTrack} />} {/* Renderiza CurrentTrack si hay un track actual */}
          <RecentlyPlayed accessToken={accessToken} />
          <TrackList tracks={tracks} />
          <QueuePlayer accessToken={accessToken} /> {/* Añade el componente QueuePlayer */}
        </>
      )}
    </div>
  );
};

export default App;
