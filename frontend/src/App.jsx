import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home";
import Profile from "./Profile";
import Login from "./Login";
import SignUp from "./SignUp";
import LandingPg from "./LandingPg";

function App() {
  return (
    <div className="app-main">
      <Routes>
        <Route path="/" element={<LandingPg />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Routes>
    </div>
  )
}
export default App
