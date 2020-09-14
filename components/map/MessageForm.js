import React from 'react';
import { Box, FormControl, FormLabel, Input, Button, Textarea } from '@chakra-ui/core';

function MessageForm() {
  return (
    <Box as="form" mt={4}>
      <FormControl id="identity">
        <FormLabel>Display name</FormLabel>
        <Input type="text" name="identity" placeholder="Enter your name" />
      </FormControl>
      <FormControl id="message" mt={2}>
        <FormLabel>Message</FormLabel>
        <Textarea type="text" name="message" placeholder="Enter a message" />
      </FormControl>
      <Button mt={4} w="full" type="submit">
        Add a message
      </Button>
    </Box>
  );
}

export default MessageForm;
