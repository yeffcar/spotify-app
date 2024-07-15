import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RecentlyPlayed = ({ accessToken }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setRecentlyPlayed(data.items.slice(0, 10)); 
        } else {
          console.error('Error fetching recently played tracks:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recently played tracks:', error);
      }
    };

    fetchRecentlyPlayed();

    const interval = setInterval(fetchRecentlyPlayed, 30000); 

    return () => clearInterval(interval); 

  }, [accessToken]);

  if (recentlyPlayed.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="current-recently-badge">Recently Played</div>
      <div className="recently-played-grid">
        {recentlyPlayed.map(item => (
          <div key={item.played_at} className="recently-played-item">
            <img src={item.track.album.images[0].url} alt="Album Art" className="track-image" />
            <div className="track-info">
              <div className="track-name">{item.track.name}</div>
              <div className="artist-name">{item.track.artists.map(artist => artist.name).join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

RecentlyPlayed.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export default RecentlyPlayed;
