// TrackList.js
import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track'; // Importar el componente Track

const TrackList = ({ tracks }) => {
  return (
    <div className="track-list">
      {tracks.map(track => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
};

export default TrackList;
