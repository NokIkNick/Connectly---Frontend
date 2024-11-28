import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Register from './page/Register';
import  Home  from './page/Home';
import { Mainpage } from './page/mainpage';
import { Messages } from './page/messages';
import Searchsite from './page/Searchsite';
function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Mainpage />} />
          <Route path="/search" element={<Searchsite/>} />
          <Route path="/signup" element={<Register />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes> 
      </BrowserRouter>
    </>
  
)}

export default App;

