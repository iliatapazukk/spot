import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import Hero from './components/Hero'
import Footer from './components/Footer/Footer'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import GiftBasket from './components/GiftBasket'
import Cart from './components/Cart'
import './styles/App.scss'

const menuItems = [
  {id: 'Hero', name: 'Главная'},
  {id: 'About', name: 'Наша миссия'},
  {id: 'Services', name: 'Что мы делаем'},
  {id: 'Contacts', name: 'Контакты'},
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
      <BrowserRouter>
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
        <Routes>
          <Route path="/" element={<Hero menuToggle={handleMenuClick}/>} />
          <Route path="/gift-basket" element={<GiftBasket/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
