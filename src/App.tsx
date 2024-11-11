import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Departments from './components/Departments'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path='/department' element={<Departments/>} />
    </Routes>
  )
}

export default App
