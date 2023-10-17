import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react';
import {ColorModeScript} from '@chakra-ui/react';
import {mode} from "@chakra-ui/theme-tools";
import {extendTheme} from "@chakra-ui/theme-utils";
import {BrowserRouter} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props)
    }
  })
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true
};

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e"
  }
};

const theme = extendTheme({
  ...config,
  styles,
  colors
});

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    //react strict mode in initial stage renders everything twice
    <React.StrictMode>
    <RecoilRoot>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App/>
      </ChakraProvider>
    </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,)
