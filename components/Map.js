import React, { useState, useRef, useEffect } from 'react';
import MapGL, { GeolocateControl } from 'react-map-gl';
import { Box, Flex, Button, useColorMode, useDisclosure, Spinner, useToast } from '@chakra-ui/core';
import MessageForm from '../components/map/MessageForm';
import CustomMarker from '../components/map/CustomMarker';
import { useMessages, useCreateMessage } from '../utils/messages';

const mapStyle = {
  light: 'mapbox://styles/mapbox/streets-v11',
  dark: 'mapbox://styles/mapbox/dark-v10',
};

function Map() {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const userLocation = useRef(null);
  const [userLocationLoading, setUserLocationLoading] = useState(false);
  const { isOpen: isMsgFormVisible, onToggle: onMsgFormToggle, onClose: onMsgFormClose } = useDisclosure();
  const [createMessage] = useCreateMessage();
  const { status, data: messages } = useMessages({
    onError: (err) => {
      toast({
        title: 'An error occurred.',
        description: err?.message || 'Unable to fetch messages',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });
  const [viewport, setViewport] = useState({
    latitude: 53.1235,
    longitude: 18.0084,
    zoom: 0,
  });

  useEffect(() => {
    if (!isMsgFormVisible || !!userLocation.current) return;

    setUserLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        userLocation.current = { longitude, latitude };

        setViewport((v) => ({
          ...v,
          longitude,
          latitude,
          zoom: 12,
        }));
        setUserLocationLoading(false);
      },
      () => {
        toast({
          title: 'An error occurred.',
          description: 'Unable to retrieve your location',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setUserLocationLoading(false);
      }
    );
  }, [isMsgFormVisible]);

  const onMessageFormSubmit = (formData) => (e) => {
    e.preventDefault();
    if (!formData.identity || !formData.message || !userLocation.current) return;

    createMessage(
      {
        identity: formData.identity,
        message: formData.message,
        ...userLocation.current,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Message created.',
            description: "We've created your message for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        },
        onError: (err) => {
          toast({
            title: 'An error occurred.',
            description: err?.message || 'Unable to add your message',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        },
        onSettled: () => {
          onMsgFormClose();
        },
      }
    );
  };

  return (
    <>
      {status === 'loading' && (
        <Spinner zIndex={2} size="xl" pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
      )}
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
            <Button disabled={userLocationLoading} onClick={onMsgFormToggle} alignSelf="flex-end" m="10px">
              {isMsgFormVisible ? 'Hide form' : 'Add message'}
            </Button>
            <Box px={2}>
              {isMsgFormVisible && <MessageForm onSubmit={onMessageFormSubmit} isLoading={userLocationLoading} />}
            </Box>
          </Flex>
          {messages &&
            Array.isArray(messages) &&
            messages.map((msg) => (
              <CustomMarker
                key={msg._id}
                identity={msg.user?.displayName}
                message={msg.message}
                longitude={msg.location?.geo?.[0]}
                latitude={msg.location?.geo?.[1]}
              />
            ))}
        </MapGL>
      </Box>
    </>
  );
}

export default Map;
