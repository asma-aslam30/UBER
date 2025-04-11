import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Start from '../src/pages/Start'
import Home from '../src/pages/Home'
import UserLogin from '../src/pages/UserLogin'
import UserSignup from '../src/pages/UserSignup'
import CaptainLogin from '../src/pages/CaptainLogin'
import CaptainSignup from '../src/pages/CaptainSignup'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
