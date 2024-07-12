import React from 'react';
import PropTypes from 'prop-types';

const CurrentTrack = ({ track }) => {
  if (!track) {
    return null; // Retorna null si no hay un track para mostrar
  }

  return (
    <div className="current-track-container">
      <div className="current-track-badge">Current Track</div>
      <div className="current-track">
        <img src={track.album.images[0].url} alt="Album Art" className="track-image" />
        <div className="track-info">
          <div className="track-name">{track.name}</div>
          <div className="artist-name">{track.artists.map(artist => artist.name).join(', ')}</div>
        </div>
      </div>
    </div>
  );
};

CurrentTrack.propTypes = {
  track: PropTypes.object // Propiedad track es un objeto que contiene la información del track actual
};

export default CurrentTrack;

