import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/ubuntu'
import './index.css'

const theme = extendTheme({ 
  fonts: {
      heading: `'Ubuntu', sans-serif`,
      body: `'Ubuntu', sans-serif`,
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
          <App />
      </ChakraProvider>
  </React.StrictMode>
);