// Queue.js

import React, { useEffect, useState } from 'react';

const Queue = ({ accessToken }) => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = () => {
      fetch('https://api.spotify.com/v1/me/player/queue', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setQueue(data.items);
        })
        .catch(error => {
          console.error('Error fetching queue: ', error);
        });
    };

    fetchQueue(); // Llamamos a la función aquí para que se ejecute al inicio

    // Agregamos fetchQueue al array de dependencias para eliminar la advertencia
  }, [accessToken]); // accessToken es la única dependencia de este efecto

  return (
    <div className="queue">
      <h2>Cola de Reproducción</h2>
      <div className="queue-list">
        {queue.map(track => (
          <div key={track.track.id} className="queue-item">
            <img src={track.track.album.images[0].url} alt="Album Art" className="queue-image" />
            <div className="queue-name">{track.track.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queue;
