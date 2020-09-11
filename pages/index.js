import React from 'react';
import Head from 'next/head';
import { Button, useColorMode, Box, Flex, Heading } from '@chakra-ui/core';
import Map from '../components/map';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box h="100vh">
      <Head>
        <title>Guest Map</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <Flex justify="center" align="center" my="4">
          <Heading as="h1">Welcome to Guest Map App!</Heading>
          <Button ml="2" onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </Flex>
        <Map />
      </Box>
    </Box>
  );
}
