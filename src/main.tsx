import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/ubuntu'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './routes/RootLayout.tsx'
import { SessionSocket } from './utils/types.ts'
import { io } from 'socket.io-client'
import Home from './routes/Home.tsx'
import UnfimiliarPage from './routes/errorPages/UnfimiliarPage.tsx'
import ChatRoom from './routes/ChatRoom/ChatRoom.tsx'
import WaitingRoom from './routes/WaitingRoom.tsx'
import BoardGame from './routes/BoardGame.tsx'
import { getUserProperties as getUserPropertiesLoader } from './loaders/getUserPropertiesLoader.ts'

const socket: SessionSocket = io('http://localhost:3002', {
  autoConnect: false
});

const router = createBrowserRouter([
  {
      path: '/',
      element: <RootLayout socket={socket}/>,
      children: [
          {
              index: true,
              element: <Home socket={socket}/>,
              
          },
          {
              path: 'chat',
              element: <ChatRoom socket={socket}  />,
              errorElement: <UnfimiliarPage />
          }, 
          {
              path: 'waitingRoom',
              element: <WaitingRoom socket={socket} />,
              errorElement: <UnfimiliarPage />
          }, 
          {
              path: 'board',
              element: <BoardGame socket={socket} />,
              loader: getUserPropertiesLoader,
              // errorElement: <UnfimiliarPage />
          }, 
          {
              path: "*",
              element: <UnfimiliarPage />
          }
      ],
  },
  {
      path: "*",
      element: <UnfimiliarPage />
  }
]);  


const theme = extendTheme({ 
  fonts: {
      heading: `'Ubuntu', sans-serif`,
      body: `'Ubuntu', sans-serif`,
  },
})

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//       <ChakraProvider theme={theme}>
//           <App />
//       </ChakraProvider>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
              <RouterProvider router={router} />
      </ChakraProvider>
  </React.StrictMode>
);