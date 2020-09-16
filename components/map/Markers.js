import React from 'react';
import PropTypes from 'prop-types';
import CustomMarker from './markers/CustomMarker';

function Markers({ data, onMarkerClick }) {
  return data.map((message) => (
    <CustomMarker
      key={message._id}
      longitude={message.location?.geo?.[0]}
      latitude={message.location?.geo?.[1]}
      onClick={onMarkerClick(message._id)}
    />
  ));
}

Markers.propTypes = {
  data: PropTypes.array.isRequired,
};

export default React.memo(Markers);
