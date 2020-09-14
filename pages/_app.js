import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ChakraProvider } from '@chakra-ui/core';
import theme from '../styles/theme';
import 'mapbox-gl/dist/mapbox-gl.css';

// eslint-disable-next-line
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </ChakraProvider>
  );
}

export default MyApp;
