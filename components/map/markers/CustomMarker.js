import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';

function CustomMarker({ onClick, longitude, latitude, offsetLeft, offsetTop }) {
  return (
    <Marker longitude={longitude} latitude={latitude} offsetLeft={offsetLeft} offsetTop={offsetTop}>
      <FaMapMarkerAlt onClick={onClick} cursor="pointer" />
    </Marker>
  );
}

CustomMarker.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number,
};

CustomMarker.defaultProps = {
  offsetLeft: -20,
  offsetTop: -10,
};

export default CustomMarker;
