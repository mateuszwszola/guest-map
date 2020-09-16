import React, { useState, useEffect, useCallback } from 'react';
import MapGL, { GeolocateControl, Popup } from 'react-map-gl';
import { Box, Flex, Button, useColorMode, useDisclosure, Spinner, useToast, Text } from '@chakra-ui/core';
import MessageForm from '../components/map/MessageForm';
import Markers from '../components/map/Markers';
import { useMessages, useCreateMessage } from '../utils/messages';
import { useLocation } from '../utils/location';

const mapStyle = {
  light: 'mapbox://styles/mapbox/streets-v11',
  dark: 'mapbox://styles/mapbox/dark-v10',
};

function Map() {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { location, status: locationStatus, getLocation } = useLocation();
  const { isOpen: isMsgFormOpen, onToggle: onMsgFormToggle, onClose: onMsgFormClose } = useDisclosure();
  const [createMessage, { isLoading: isAddingMessage }] = useCreateMessage();
  const { status: messagesStatus, data: messages } = useMessages({
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
  const [activeMessage, setActiveMessage] = useState(null);

  const handleMarkerClick = useCallback(
    (messageId) => () => {
      const message = messages && messages.find((msg) => msg._id === messageId);
      if (message) {
        setActiveMessage(message);
      }
    },
    [messages]
  );

  useEffect(() => {
    if (!isMsgFormOpen || !!location) return;

    getLocation(
      (position) => {
        setViewport((v) => ({
          ...v,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 12,
        }));
      },
      (errMsg) => {
        toast({
          title: 'An error occurred.',
          description: errMsg,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    );
  }, [isMsgFormOpen, getLocation, location, toast]);

  const onMessageFormSubmit = (formData) => (e) => {
    e.preventDefault();

    if (!formData.identity || !formData.message || !location) return;

    createMessage(
      {
        identity: formData.identity,
        message: formData.message,
        ...location,
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
      {messagesStatus === 'loading' && (
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
            <Button
              disabled={locationStatus === 'loading' || isAddingMessage}
              onClick={onMsgFormToggle}
              alignSelf="flex-end"
              m="10px"
            >
              {isMsgFormOpen ? 'Hide form' : 'Add message'}
            </Button>
            {isMsgFormOpen && (
              <Box px={2}>
                <MessageForm
                  onSubmit={onMessageFormSubmit}
                  isLoading={locationStatus === 'loading' || isAddingMessage}
                />
              </Box>
            )}
          </Flex>
          {messages && Array.isArray(messages) && <Markers data={messages} onMarkerClick={handleMarkerClick} />}
          {!!activeMessage && (
            <Popup
              longitude={activeMessage.location?.geo?.[0]}
              latitude={activeMessage.location?.geo?.[1]}
              closeButton={false}
              onClose={() => setActiveMessage(null)}
              closeOnClick={true}
              offsetTop={-12}
              offsetLeft={-12}
            >
              <Box>
                <Text color="black">{activeMessage.user.displayName}</Text>
                <Text color="black">{activeMessage.message}</Text>
              </Box>
            </Popup>
          )}
        </MapGL>
      </Box>
    </>
  );
}

export default Map;
