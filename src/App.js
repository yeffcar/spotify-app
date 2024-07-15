import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TrackList from './components/TrackList';
import CurrentTrack from './components/CurrentTrack';
import RecentlyPlayed from './components/RecentlyPlayed';
import QueuePlayer from './components/QueuePlayer';
import useSpotifyToken from './hooks/useSpotifyToken';
import useCurrentTrack from './hooks/useCurrentTrack';
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
    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setTracks(data.tracks.items);
      })
      .catch(error => {
        console.error('Error searching tracks: ', error);
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expiry_time');
    window.location.reload();
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
           {currentTrack && <CurrentTrack track={currentTrack} className="component-spacing" />} 
          <TrackList tracks={tracks} className="component-spacing" />
          <RecentlyPlayed accessToken={accessToken} className="component-spacing" />
          <QueuePlayer accessToken={accessToken} className="component-spacing" /> 
        </>
      )}
    </div>
  );
};

export default App;
