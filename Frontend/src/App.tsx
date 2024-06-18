import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import { Room } from './components/Room';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />         
        <Route path="/room" element={<Room />} />   
        {/* <Route path="/" element={<Landing />} />          */}
      
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
