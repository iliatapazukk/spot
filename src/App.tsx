import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import Hero from './components/Hero'
import Location from './components/Location'
import Services from './components/Services'
import About from './components/About'
import { ReactComponent as Footer} from './assets/images/footer.svg'
import './styles/App.scss'

const menuItems = [
  {id: 'Hero', name: 'Глагне'},
  {id: 'About', name: 'Наша миссия'},
  {id: 'Services', name: 'Что мы делаем'},
  {id: 'Location', name: 'Локация'},
]

function App() {
  const [menu, toggleMenu] = React.useState<boolean>(false)
  const handleMenuClick = () => {
    toggleMenu(!menu)
  }
  const navbarVariants = {
    opened: {
      top: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.5,
      },
    },
    closed: {
      top: "-100vh",
      opacity: 0,
      transition: {
        duration: 0.5,
      }
    },
  };
  return (
    <div className="App">
      <Hero menuToggle={handleMenuClick}/>
      <motion.nav
        initial={false}
        className="navbar"
        animate={menu ? "opened" : "closed"}
        variants={navbarVariants}>
          { menuItems.map((item, index) => (
            <motion.div
              className="item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              key={index}>
              <Link
                className="link"
                activeClass="-active"
                to={item.id}
                spy={true}
                smooth={true}
                offset={0}
                duration={100}
                onClick={handleMenuClick}
              >
                {item.name}
              </Link>
            </motion.div>
            ))
          }
      </motion.nav>
      <About />
      <Services />
      <Location/>
      <Footer />
    </div>
  );
}

export default App;
