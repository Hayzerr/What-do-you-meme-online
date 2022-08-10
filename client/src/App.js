import './App.css'
import React, { Component }  from 'react';

import {
  Routes,
  Route
} from "react-router-dom"
import Homepage from './components/Homepage'
import Game from './components/Game'
import Rules from './components/Rules'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={< Homepage/>} />
        <Route path='/play' element={< Game/>} />
        <Route path = '/rules' element={< Rules/>} />
      </Routes>
    </div>
  )
}

export default App
