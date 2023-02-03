import React from "react";
import { Routes, Route } from 'react-router-dom'
import "./styles/Home.css"
import "./styles/index.css"
import "./styles/login.css"

import Home from "./pages/Home";
import Login from "./pages/Login";



const App = () =>{
 
  return(
    <>
    <Routes>
      <Route path="/samil/*" element = {<Home/>}></Route>
      <Route path = "/samil" element = {<Login/>}/>
    </Routes>
    </>
  )
}

export default App