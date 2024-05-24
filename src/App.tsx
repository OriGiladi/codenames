
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './routes/RootLayout'
import UnfimiliarPage from './routes/errorPages/UnfimiliarPage'
import BoardGame from './routes/BoardGame'
import ChatRoom from './routes/ChatRoom/ChatRoom'
import {io } from 'socket.io-client';
import Home from './routes/Home'
import { SessionSocket } from './utils/types'

import WaitingRoom from './routes/WaitingRoom'


const socket: SessionSocket = io('http://localhost:3002', {
  autoConnect: false
});
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path="/" 
        element={<RootLayout socket={socket} />}>
            <Route 
            index 
            element={<Home socket={socket}/>} 
            />
            <Route 
            path='/chat' 
            element={<ChatRoom socket={socket} />} 
            />
            <Route 
            path='/waitingRoom' 
            element={<WaitingRoom socket={socket} />} 
            />
            <Route 
            path='/board' 
            element={<BoardGame socket={socket}/>} 
            />
    
            <Route 
            path="*" 
            element={<UnfimiliarPage />} 
            />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
