import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import ActivateProject from './pages/ActivateProject'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Workprogram from './pages/Workprogram'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/clients" element={<Clients />}></Route>
      <Route path="/projects" element={<Projects />}></Route>
      <Route path="/activate" element={<ActivateProject />}></Route>
      <Route path="/workprogram" element={<Workprogram />}></Route>
    </Routes>
  )
}

export default App
