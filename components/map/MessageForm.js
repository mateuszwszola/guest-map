import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, FormControl, FormLabel, Input, Button, Textarea } from '@chakra-ui/core';
import { Spinner } from '@chakra-ui/core';

function MessageForm({ onSubmit, isLoading }) {
  const [identity, setIdentity] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Box pos="relative" mt={4}>
      {isLoading && (
        <Flex
          pos="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          direction="column"
          justify="center"
          align="center"
          zIndex={2}
        >
          <Spinner size="lg" />
          <Text>Loading user location...</Text>
        </Flex>
      )}
      <Box opacity={isLoading ? '0.75' : '1'} onSubmit={onSubmit({ identity, message })} as="form">
        <FormControl id="identity">
          <FormLabel>Display name</FormLabel>
          <Input
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            type="text"
            name="identity"
            placeholder="Enter your name"
          />
        </FormControl>
        <FormControl id="message" mt={2}>
          <FormLabel>Message</FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            name="message"
            placeholder="Enter a message"
          />
        </FormControl>
        <Button mt={4} w="full" type="submit">
          Add a message
        </Button>
      </Box>
    </Box>
  );
}

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MessageForm;
