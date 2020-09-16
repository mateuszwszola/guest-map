import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Box, Flex, Text, FormControl, FormLabel, Input, Button, Textarea, Spinner } from '@chakra-ui/core';
import { BiError } from 'react-icons/bi';

function MessageForm({ onSubmit, isLoading }) {
  const { register, handleSubmit, errors } = useForm();

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
      <Box opacity={isLoading ? '0.75' : '1'} onSubmit={handleSubmit((data) => onSubmit(data))} as="form">
        <FormControl id="identity">
          <FormLabel>Display name</FormLabel>
          <Input ref={register} name="identity" type="text" placeholder="Enter your name" />
        </FormControl>
        <FormControl id="message" mt={2}>
          <FormLabel>Message</FormLabel>
          <Textarea ref={register({ required: true })} name="message" type="text" placeholder="Enter a message" />
          {errors.message && (
            <Flex align="center" color="red.500" fontSize="sm">
              <BiError />
              Message is required
            </Flex>
          )}
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
