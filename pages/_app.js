import React from 'react';
import { ChakraProvider } from '@chakra-ui/core';
import theme from '../styles/theme';
import 'mapbox-gl/dist/mapbox-gl.css';

// eslint-disable-next-line
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
