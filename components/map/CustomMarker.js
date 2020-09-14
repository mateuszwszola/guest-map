import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';

function CustomMarker({ longitude, latitude, offsetLeft, offsetTop }) {
  return (
    <Marker longitude={longitude} latitude={latitude} offsetLeft={offsetLeft} offsetTop={offsetTop}>
      <FaMapMarkerAlt />
    </Marker>
  );
}

CustomMarker.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number,
};

CustomMarker.defaultProps = {
  offsetLeft: -20,
  offsetTop: -10,
};

export default CustomMarker;
