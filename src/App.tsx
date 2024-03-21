
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './routes/RootLayout'
import UnfimiliarPage from './routes/errorPages/UnfimiliarPage'
import BoardGame from './routes/BoardGame'
import { getInitialGameProperties } from './gameFunctionality/gameInitialization'

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
            element={<BoardGame />} 
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
