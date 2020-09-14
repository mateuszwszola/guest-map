import React, { useState } from 'react';
import { Box, Flex, Button, useColorMode, Input, FormControl, FormLabel, useDisclosure } from '@chakra-ui/core';
import MapGL, { GeolocateControl, Marker } from 'react-map-gl';
import { FaMapMarkerAlt } from 'react-icons/fa';

function MessageForm() {
  return (
    <Box as="form" mt={4}>
      <FormControl id="identity">
        <FormLabel>Display name</FormLabel>
        <Input type="text" name="identity" placeholder="Enter your name" />
      </FormControl>
      <FormControl id="message" mt={2}>
        <FormLabel>Message</FormLabel>
        <Input type="text" name="identity" placeholder="Enter a message" />
      </FormControl>
      <Button mt={4} w="full" type="submit">
        Add a message
      </Button>
    </Box>
  );
}

function Map() {
  const { colorMode } = useColorMode();
  const [viewport, setViewport] = useState({
    latitude: 53.1235,
    longitude: 18.0084,
    zoom: 0,
  });
  const { isOpen: isMsgFormVisible, onToggle: onMsgFormToggle } = useDisclosure();

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
        <Box pos="absolute" top="0" left="0" margin="10px">
          <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
        </Box>
        <Flex direction="column" pos="absolute" top="0" right="0" w="full" maxWidth={['100%', 'sm']}>
          <Button onClick={onMsgFormToggle} alignSelf="flex-end" m="10px">
            {isMsgFormVisible ? 'Hide form' : 'Add message'}
          </Button>
          <Box px={2}>{isMsgFormVisible && <MessageForm />}</Box>
        </Flex>
        {/* <Marker longitude={21} latitude={52} offsetLeft={-20} offsetTop={-10}>
          <FaMapMarkerAlt />
        </Marker> */}
      </MapGL>
    </Box>
  );
}

export default Map;
