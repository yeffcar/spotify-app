// RecentlyPlayed.js

import React, { useEffect, useState } from 'react';

const RecentlyPlayed = ({ accessToken }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const fetchRecentlyPlayed = () => {
      fetch('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setRecentlyPlayed(data.items);
        })
        .catch(error => {
          console.error('Error fetching recently played tracks: ', error);
        });
    };

    fetchRecentlyPlayed(); // Llamamos a la función aquí para que se ejecute al inicio

    // Agregamos fetchRecentlyPlayed al array de dependencias para eliminar la advertencia
  }, [accessToken]); // accessToken es la única dependencia de este efecto

  return (
    <div className="recently-played">
      <h2>Pistas Reproducidas Recientemente</h2>
      <div className="recently-played-list">
        {recentlyPlayed.map(track => (
          <div key={track.track.id} className="recently-played-item">
            <img src={track.track.album.images[0].url} alt="Album Art" className="recently-played-image" />
            <div className="recently-played-name">{track.track.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;

