import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { Searchsite } from './page/searchpage'
import Register from './page/Register';
import  Home  from './layout/Home';
import { Mainpage } from './page/mainpage';

function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Mainpage />} />
          <Route path="/search" element={<Searchsite/>} />
          <Route path="/signup" element={<Register />} />
          
        </Routes> 
      </BrowserRouter>

    </>
  )
}

export default App;

