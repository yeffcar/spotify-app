// Track.js
import React from 'react';
import PropTypes from 'prop-types';

const Track = ({ track }) => {
  return (
    <div className="track">
      <img src={track.album.images[0].url} alt="Album Art" className="track-image" />
      <div className="track-name">{track.name}</div>
      <div className="track-artists">{track.artists.map(artist => artist.name).join(', ')}</div>
      <div className="track-album">{track.album.name}</div>
    </div>
  );
};

Track.propTypes = {
  track: PropTypes.object.isRequired,
};

export default Track;
