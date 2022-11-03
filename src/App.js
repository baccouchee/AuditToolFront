import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import ActivateProject from './pages/ActivateProject'
import Clients from './pages/Clients'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Rcm from './pages/Rcm'
import Workprogram from './pages/Workprogram'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/clients" element={<Clients />}></Route>
      <Route path="/projects" element={<Projects />}></Route>
      <Route path="/projects/activate/:id" element={<ActivateProject />}></Route>
      <Route path="/projects/workprogram/:id" element={<Workprogram />}></Route>
      <Route path="/projects/workprogram/rcm/:workprogram" element={<Rcm />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  )
}

export default App
