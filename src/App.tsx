import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { useLocation } from 'react-router'
import Helmet from 'react-helmet'
import Hero from './components/Hero'
import Footer from './components/Footer/Footer'
import GiftBasket from './components/GiftBasket'
import Cart from './components/Cart'
import './styles/App.scss'

const menuItems = [
  {id: 'Hero', name: 'Главная'},
  {id: 'About', name: 'Наша миссия'},
  {id: 'Services', name: 'Что мы делаем'},
  {id: 'Contacts', name: 'Контакты'},
]

const ScrollToTop = (props) => {
  const location = useLocation()
  React.useEffect(() => { window.scrollTo(0, 0); }, [location])

  return <>{props.children}</>
};

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
      <Helmet>
        <title>Спот. Креативное пространство</title>
        <meta name="description" content="Спот. Соколиное, Крым - креативное пространство в горном Крыму.
        Спот - это кофейня, шоу-рум с сувенирами мастеров Бельбекской ярмарки, концерты, мастер-классы,
        туристические услуги в  сердце Бельбекской долины. Уютный сад со сценой и кинотеатром под открытым небом."/>
      </Helmet>
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
        <ScrollToTop>
          <Routes>
              <Route path="/" element={<Hero menuToggle={handleMenuClick}/>} />
              <Route path="/gift-basket" element={<GiftBasket/>} />
              <Route path="/cart" element={<Cart/>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
