import React from 'react'
import Hero from './components/Hero'
import Location from './components/Location'
import Navbar from './components/Navbar'
import Services from './components/Services'

import './styles/App.scss'
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Hero/>
      <Navbar/>
      <About />
      <Services />
      <Location/>
    </div>
  );
}

export default App;
