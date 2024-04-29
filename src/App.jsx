
import './App.css';
import React, { createContext,  useState } from 'react';
import { Routes, Route } from "react-router-dom";
import AddBdd from './component/AddBdd';
import Home from './component/Home';

export const Ctx = createContext()
Ctx.displayName = "Ctx";
function App() {
  let[context,setcontext]= useState()
  return(<>
    <Ctx.Provider value={[context,setcontext]}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/push' element={<AddBdd />}  />
    </Routes>
    
  </Ctx.Provider>
  </>
  )
}


export default App
