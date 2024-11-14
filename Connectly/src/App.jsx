import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import { Searchsite } from './page/searchpage'
import Login from './auth/login';
import Register from './auth/register';
import Home from './layout/Home';

function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Searchsite/>} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
        </Routes> 
      </BrowserRouter>

    </>
  )
}

export default App;
