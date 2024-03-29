
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './routes/RootLayout'
import UnfimiliarPage from './routes/errorPages/UnfimiliarPage'
import BoardGame from './routes/BoardGame'
import { getInitialGameProperties } from './gameFunctionality/gameInitialization'
import ChatRoom from './routes/ChatRoom/ChatRoom'
import socketIO from 'socket.io-client';
import { Socket } from 'socket.io-client';
const socket: Socket = socketIO.connect('http://localhost:3002',/* {
  autoConnect: false
}*/);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path="/" 
        element={<RootLayout />}>
            <Route 
            index 
            loader={getInitialGameProperties()}
            element={<BoardGame socket={socket}/>} 
            />
            <Route 
            path='/chat' 
            element={<ChatRoom socket={socket} />} 
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
