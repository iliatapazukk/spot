import React from 'react'
import ReactTooltip from 'react-tooltip'
import { useSpring, animated } from 'react-spring'
import { ReactComponent as Vk } from '../../assets/images/vk.svg'
import { ReactComponent as Tg } from '../../assets/images/tg.svg'
import { ReactComponent as Inst } from '../../assets/images/inst.svg'
import { ReactComponent as Sky } from '../../assets/images/sky.svg'
import { ReactComponent as Mountains } from '../../assets/images/mountains.svg'
import { ReactComponent as Foreground } from '../../assets/images/foreground.svg'
import { ReactComponent as Spot} from '../../assets/images/spot.svg'
import './Hero.scss'

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const sky = (x, y) => `translate3d(${x / 30}px,${y / 25}px,0)`
const mountains = (x, y) => `translate3d(${x / 25}px, ${y / 20}px ,0)`
const foreground = (x, y) => `translate3d(${x / 18}px,${y / 15}px,0)`

const Hero: React.FC = () => {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  return (
    <div
      className="Hero"
      id="Hero"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <div className="content">
        <div className="logo">
          <Spot />
        </div>
        <div className="social">
          <a
            data-tip="Наше общение в Telegram"
            href="https://t.me/spot_loft/"
            target="_blank"
            rel="noreferrer noopener"
            className="lnk"
          >
            <Tg />
          </a>
          <a
            data-tip="Мы в Instagram"
            href="https://www.instagram.com/spot_creative_space/"
            target="_blank"
            rel="noreferrer noopener"
            className="lnk"
          >
            <Inst />
          </a>
          <a
            data-tip="Мы в Вконтакте"
            href="https://vk.com/spot_creative_space"
            target="_blank"
            rel="noreferrer noopener"
            className="lnk"
          >
            <Vk />
          </a>
        </div>
      </div>
      <ReactTooltip effect="solid" type="light"/>
      <div className="parallax">
        <animated.div
          style={{ transform: props.xy.interpolate(sky) }}
          className="layer sky"
        >
          <Sky/>
        </animated.div>
        <animated.div
          style={{ transform: props.xy.interpolate(mountains) }}
          className="layer mountains"
        >
          <Mountains/>
        </animated.div>
        <animated.div
          style={{ transform: props.xy.interpolate(foreground) }}
          className="layer foreground"
        >
          <Foreground/>
        </animated.div>
      </div>
    </div>
  )
}

export default Hero
