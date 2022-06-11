import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Clients from './pages/Clients'
import Projects from './pages/Projects'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/clients" element={<Clients />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App
