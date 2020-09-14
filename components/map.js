import React, { useState } from 'react';
import { Box, useColorMode } from '@chakra-ui/core';
import MapGL, { GeolocateControl, Marker } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';

function Map() {
  const { colorMode } = useColorMode();
  const [viewport, setViewport] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
    zoom: 14,
  });

  const mapStyle = {
    light: 'mapbox://styles/mapbox/streets-v11',
    dark: 'mapbox://styles/mapbox/dark-v10',
  };

  return (
    <Box flex="1" h="100%">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={mapStyle[colorMode]}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        <GeolocateControl
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 10,
          }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <Marker longitude={21} latitude={52} offsetLeft={-20} offsetTop={-10}>
          <FaMapMarkerAlt />
        </Marker>
      </MapGL>
    </Box>
  );
}

export default Map;
