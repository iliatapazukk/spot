import React from 'react'
import Hero from './components/Hero'
import Location from './components/Location'
import Navbar from './components/Navbar'
import Services from './components/Services'
import { ReactComponent as Footer} from './assets/images/footer.svg'

import './styles/App.scss'
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Hero/>
      {/*<Navbar/>*/}
      <About />
      <Services />
      <Location/>
      <Footer />
    </div>
  );
}

export default App;
