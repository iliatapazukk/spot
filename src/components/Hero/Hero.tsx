import React from 'react'
import cx from 'classnames'
import { animated } from 'react-spring'

import { ReactComponent as Vk } from '../../assets/images/vk.svg'
import { ReactComponent as Tg } from '../../assets/images/tg.svg'
import { ReactComponent as Inst } from '../../assets/images/inst.svg'
import { ReactComponent as Sky } from '../../assets/images/sky.svg'
import { ReactComponent as Mountains } from '../../assets/images/mountains.svg'
import { ReactComponent as Foreground } from '../../assets/images/foreground.svg'
import { ReactComponent as Spot} from '../../assets/images/spot.svg'
import { ReactComponent as Menu} from '../../assets/images/menu.svg'
import './Hero.scss'

type Props = {
  menuToggle: () => void
}

const Hero: React.FC<Props> = (props) => {
  // const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))

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
    <div
      className="Hero"
      id="Hero"
      // onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <div className={cx('content', scroll && '-is-scrolled')}>
        <div className="logo">
          <Spot onClick={scrollTop}/>
          <div className="menu" onClick={props.menuToggle}>
            <Menu />
          </div>
        </div>
        <div className="social">
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
        <animated.div
          className="layer sky"
        >
          <Sky/>
        </animated.div>
        <animated.div
          className="layer mountains"
        >
          <Mountains/>
        </animated.div>
        <animated.div
          className="layer foreground"
        >
          <Foreground/>
        </animated.div>
      </div>
    </div>
  )
}

export default Hero
