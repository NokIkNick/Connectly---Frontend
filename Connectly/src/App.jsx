import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import { Searchsite } from './page/searchpage'

function App() {

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Searchsite/>} />
        </Routes> 
      </BrowserRouter>

    </>
  )
}

export default App
