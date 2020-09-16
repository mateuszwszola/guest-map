import React from 'react';
import Head from 'next/head';
import { useColorMode, Box, Flex, IconButton, Text } from '@chakra-ui/core';
import { SiOpenstreetmap } from 'react-icons/si';
import { FiSun, FiMoon } from 'react-icons/fi';
import Map from '../components/Map';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Guest Map</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Box h="100vh">
        <Flex as="main" h="100%" direction="column">
          <Flex justify="space-between" align="center" w="full" maxW="1280px" mx="auto" p={2}>
            <Box as="h1" display="flex" alignItems="center" fontSize="2xl" fontWeight="bold">
              <SiOpenstreetmap />
              <Text as="span" ml={1} textTransform="uppercase" letterSpacing="tighter">
                GuestMap
              </Text>
            </Box>
            <Box ml={2}>
              <IconButton
                onClick={toggleColorMode}
                aria-label="Toggle theme"
                icon={colorMode === 'dark' ? <FiMoon /> : <FiSun />}
              />
            </Box>
          </Flex>
          <Map />
        </Flex>
      </Box>
    </>
  );
}
