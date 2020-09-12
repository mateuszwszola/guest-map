import React from 'react';
import Head from 'next/head';
import { useColorMode, Box, Flex, Heading, IconButton } from '@chakra-ui/core';
import Map from '../components/map';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box h="100vh">
      <Head>
        <title>Guest Map</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex as="main" h="100%" direction="column">
        <Flex justify="center" align="center" p={2}>
          <Heading as="h1" textAlign="center">
            Welcome to Guest Map App!
          </Heading>
          <Box ml={2}>
            <IconButton
              icon={colorMode === 'dark' ? 'moon' : 'sun'}
              aria-label="Toggle theme"
              onClick={toggleColorMode}
            />
          </Box>
        </Flex>
        <Map />
      </Flex>
    </Box>
  );
}
