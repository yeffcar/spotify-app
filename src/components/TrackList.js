import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track'; 

const TrackList = ({ tracks }) => {
  return (
    <div>
    <div className="current-search-badge">Search Results</div>
    <div className="track-list">
      {tracks.slice(0, 10).map(track => (
        <Track key={track.id} track={track} />
      ))}
    </div>
    </div>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
};

export default TrackList;
