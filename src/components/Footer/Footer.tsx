import React from 'react'
import { ReactComponent as Vk } from '../../assets/images/vk.svg'
import { ReactComponent as Tg } from '../../assets/images/tg.svg'
import { ReactComponent as Spot} from '../../assets/images/spot.svg'
import './Footer.scss'

const year = new Date().getFullYear().toString();

const Footer: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  if (ref.current) ref.current.innerText = year
  return (
    <div className="Footer">
      <div className="links">
        <div>
          <Spot className="logo" />
        </div>
        <div>
          <a
            href="https://t.me/spot_loft/"
            target="_blank"
            rel="noreferrer noopener"
            className="lnk"
          >
            <Tg/>
          </a>
          <a
            href="https://vk.com/spot_creative_space"
            target="_blank"
            rel="noreferrer noopener"
            className="lnk"
          >
            <Vk/>
          </a>
          <div className="copyright">
            © <span ref={ref}>2021</span> Spot Creative Space
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Footer)
