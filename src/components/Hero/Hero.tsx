import React from 'react'
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
          <a href="#" className="lnk">
            <Tg />
          </a>
          <a href="#" className="lnk">
            <Inst />
          </a>
          <a href="#" className="lnk">
            <Vk />
          </a>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Hero)
