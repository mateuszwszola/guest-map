/* eslint-disable react/react-in-jsx-scope */
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/core';

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialValue="system" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
