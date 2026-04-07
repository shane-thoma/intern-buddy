import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./home";
import Profile from "./Profile";

function App() {
  

  return (
   <div className = "app-main">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
      </Routes>

   </div>
  )
}

export default App
