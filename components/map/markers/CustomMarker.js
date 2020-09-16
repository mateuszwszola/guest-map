import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/core';

function CustomMarker({ onClick, longitude, latitude, offsetLeft, offsetTop }) {
  return (
    <Marker longitude={longitude} latitude={latitude} offsetLeft={offsetLeft} offsetTop={offsetTop}>
      <IconButton variant="ghost" onClick={onClick} aria-label="show message" icon={<FaMapMarkerAlt />} />
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
