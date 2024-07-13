// QueuePlayer.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const QueuePlayer = ({ accessToken }) => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchQueue = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/player/queue', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Limitar la cola a 10 elementos
          const limitedQueue = data.queue.slice(0, 10);
          setQueue(limitedQueue);
        } else {
          console.error('Error fetching queue:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching queue:', error);
      }
    };

    fetchQueue();

    const interval = setInterval(() => {
      fetchQueue();
    }, 3000);

    return () => clearInterval(interval); // Limpiar intervalo en el desmontaje del componente
  }, [accessToken]);

  return (
    <div>
    <div className="current-track-badge">Queue</div>
    <div className="queue-player">
      {queue.length === 0 ? (
        <p>No songs in queue</p>
      ) : (
        <div className="queue-list">
          {queue.map((track, index) => (
            <div key={index} className="track-item">
              <img src={track.album.images[0].url} alt="Album Art" className="track-image" />
              <div className="track-info">
                <div className="track-name">{track.name}</div>
                <div className="artist-name">{track.artists.map(artist => artist.name).join(', ')}</div>
                <div className="track-album">{track.album.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

QueuePlayer.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export default QueuePlayer;
