import React from 'react'
import cx from 'classnames'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ReactComponent as Gift } from '../../assets/images/giftbox.svg'
import { ReactComponent as Vk } from '../../assets/images/vk.svg'
import { ReactComponent as Tg } from '../../assets/images/tg.svg'
import { ReactComponent as Inst } from '../../assets/images/inst.svg'
import { ReactComponent as Sky } from '../../assets/images/sky.svg'
import { ReactComponent as Mountains } from '../../assets/images/mountains.svg'
import { ReactComponent as Foreground } from '../../assets/images/foreground.svg'
import { ReactComponent as Spot} from '../../assets/images/spot.svg'
import { ReactComponent as Menu} from '../../assets/images/menu.svg'
import About from '../About';
import Slides from '../Slides';
import Services from '../Services';
import Contacts from '../Contacts';
import GiftAnnounce from '../GiftAnnounce';
import './Hero.scss'

type Props = {
  menuToggle: () => void
}

const Hero: React.FC<Props> = (props) => {
  const [scroll, setScroll] = React.useState<boolean>(false)
  const height = window.innerHeight/2
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > height)
    })
  }, [height])

  const scrollTop = () => {
    if (scroll) window.scrollTo({top: 0, behavior: 'smooth'})
  }


  return (
    <>
      <motion.div
        className="Hero"
        id="Hero"
      >
        <div className={cx('content', scroll && '-is-scrolled')}>
          <div className="logo">
            <Spot onClick={scrollTop}/>
            <div className="menu" onClick={props.menuToggle}>
              <Menu />
            </div>
          </div>
          <div className="social">
            <motion.div
              whileHover={{rotate: [6, -6], transition:{
                duration: 0.3,
                yoyo: Infinity,}

            }}
              >
              <Link to="gift-basket" className="lnk">
                <Gift/>
              </Link>
            </motion.div>
            <a
              href="https://t.me/spot_loft/"
              target="_blank"
              rel="noreferrer noopener"
              className="lnk"
            >
              <Tg />
            </a>
            <a
              href="https://www.instagram.com/spot_creative_space/"
              target="_blank"
              rel="noreferrer noopener"
              className="lnk"
            >
              <Inst />
            </a>
            <a
              href="https://vk.com/spot_creative_space"
              target="_blank"
              rel="noreferrer noopener"
              className="lnk"
            >
              <Vk />
            </a>
          </div>
        </div>
        <div className="parallax">
          <motion.div
            className="layer sky"
          >
            <Sky/>
          </motion.div>
          <motion.div
            className="layer mountains"
          >
            <Mountains/>
          </motion.div>
          <motion.div
            className="layer foreground"
          >
            <Foreground/>
          </motion.div>
        </div>
      </motion.div>
      <GiftAnnounce />
      <About />
      <Slides />
      <Services />
      <Contacts />
    </>
  )
}

export default Hero
