import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
import MapGL from 'react-map-gl';

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  return (
    <Box>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      />
    </Box>
  );
}

export default Map;
