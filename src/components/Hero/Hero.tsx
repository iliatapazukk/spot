import React from 'react'
import ReactTooltip from 'react-tooltip';
import {ReactComponent as Vk} from '../../assets/vk.svg'
import {ReactComponent as Tg} from '../../assets/tg.svg'
import {ReactComponent as Inst} from '../../assets/inst.svg'
import logo from '../../assets/logo.jpeg'
import './Hero.scss'

const Hero: React.FC = () => {
  return (
    <div className="Hero">
      <div className="content">
        <div className="logo">
          <img src={logo} alt="Spot" />
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
    </div>
  )
}

export default Hero
