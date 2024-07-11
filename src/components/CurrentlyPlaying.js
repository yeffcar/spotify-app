// CurrentlyPlaying.js

import React, { useEffect, useState } from 'react';

const CurrentlyPlaying = ({ accessToken }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchCurrentlyPlaying = () => {
      fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setCurrentTrack(data.item);
        })
        .catch(error => {
          console.error('Error fetching currently playing track: ', error);
        });
    };

    fetchCurrentlyPlaying(); // Llamamos a la función aquí para que se ejecute al inicio

    // Agregamos fetchCurrentlyPlaying al array de dependencias para eliminar la advertencia
  }, [accessToken]); // accessToken es la única dependencia de este efecto

  return (
    <div className="currently-playing">
      <h2>Reproduciendo Ahora</h2>
      {currentTrack && (
        <div className="track">
          <img src={currentTrack.album.images[0].url} alt="Album Art" className="track-image" />
          <div className="track-name">{currentTrack.name}</div>
        </div>
      )}
    </div>
  );
};

export default CurrentlyPlaying;
